import CartDTO from '../../dto/cart.dto';
import { logger } from '../../../utils/logger';
import {v4 as uuidv4} from 'uuid';


import fs from 'fs';
import createFolder from '../../../utils/fs/folders.utils';

import AppError from '../../../middlewares/error.middleware';
import { ICartRepository, CartInterface, FullCartInterface } from '../../../interfaces/cart.interfaces';

class CartFileRepository implements ICartRepository{
    public static instance: CartFileRepository;
    private folderName : string;
    private fileName : string;
    private ruta: string;

    constructor(_nombreArchivo: string){
        this.folderName = 'tmp/db/';
        this.fileName = `${_nombreArchivo}.txt`;
        this.ruta = this.folderName + this.fileName;
        this.createFile();
    }

    static getInstance(_nombreArchivo: string) : ICartRepository{
        if (!this.instance){
            this.instance = new CartFileRepository(_nombreArchivo);
            logger.info(`Cart Repository: File ${this.instance.ruta} used`);
        }

        return this.instance
    }

    async createFile() : Promise<void> {
        await createFolder(this.folderName);
        try{
            const exists = fs.existsSync(this.ruta);
            if (!exists) {
                await fs.promises.writeFile(this.ruta, "");
                logger.info(`Cart Repository: File ${this.ruta} created`)
            }
        } catch (err : any) {
            logger.error(`Cart Repository: Error creating file:${err.message}`)
        }
    }
    async getAll() : Promise<FullCartInterface[]>{
        try{
            const contenido = await fs.promises.readFile(this.ruta, 'utf-8');
            if (contenido == ""){
                let data : [] = [];
                return data;
            }
            const data : FullCartInterface[] = JSON.parse(contenido);
            return data;
        } catch (err : any){
            throw new AppError(err.message, 'File data process', 'Carts Repository','getAll() error', 500 );
        }
    }
    async append(cartData : CartInterface) : Promise<FullCartInterface>{
        try{
            const objetosExistentes : CartInterface[] = await this.getAll();
            const _id : string = uuidv4();
            
            const newCart : FullCartInterface = {...cartData, _id:_id};
            objetosExistentes.push(newCart);

            const data : string = JSON.stringify(objetosExistentes);
            await fs.promises.writeFile(this.ruta, data)
            return newCart
        } catch (err : any){
            throw new AppError(err.message, 'File data process', 'Carts Repository','append() error', 500 );
        }
    }

    async update(cartData : FullCartInterface) : Promise<boolean>{
        try{
            const objetosExistentes : FullCartInterface[] = await this.getAll();
            
            const updatedCart : FullCartInterface[] = objetosExistentes.map(item => {
                if (item._id == cartData._id){
                    item = cartData;
                }
                return item
            })
            const data : string = JSON.stringify(updatedCart);
            await fs.promises.writeFile(this.ruta, data)
            return true
        } catch (err : any){
            throw new AppError(err.message, 'File data process', 'Carts Repository','update(cartData) error', 500 );
        }
    }

    async getLastCart(userId : string ) : Promise<FullCartInterface | null >{
        try{
            const objetosExistentes : FullCartInterface[] = await this.getAll();
            const query : FullCartInterface[] = objetosExistentes.filter(it => (it.userId === userId && it.completed == false));
            if ( !query?.length ) {
                return null;
            }
            return query[ query.length - 1 ];
        } catch(err : any) {
            throw new AppError(err.message, 'File data process', 'Carts Repository','getLastCart(userId) error', 500 );
        }
    }

    async getByCondition( fieldName : keyof FullCartInterface, fieldValue : string ) : Promise<FullCartInterface | null>{
        try{
            const objetosExistentes : FullCartInterface[] = await this.getAll();
            const query : FullCartInterface[] = objetosExistentes.filter(it => it[fieldName] === fieldValue);
            if ( !query?.length ) {
                return null;
            }
            return query[0];
        } catch(err : any) {
            throw new AppError(err.message, 'File data process', 'Carts Repository','getByCondition(fieldName, fieldValue) error', 500 );
        }
    }
    async deleteByCondition( fieldName : keyof FullCartInterface, fieldValue : string) : Promise<boolean>{
        try{
            const objetosExistentes : FullCartInterface[] = await this.getAll();
            const filteredObject : FullCartInterface[] = objetosExistentes.filter(it => it[fieldName] != fieldValue);
            if ( objetosExistentes === filteredObject ) {
                return false
            }
            const data : string = JSON.stringify(filteredObject);
            await fs.promises.writeFile(this.ruta, data);
            return true;
        } catch(err : any) {
            throw new AppError(err.message, 'File data process', 'Carts Repository','deleteByCondition(fieldName, fieldValue) error', 500 );
        }
    }
    async deleteAll() : Promise<boolean> {
        try{
            await fs.promises.writeFile(this.ruta, "");
            return true
        } catch(err : any) {
            throw new AppError(err.message, 'File data process', 'Carts Repository','deleteAll error', 500 );
        }
    }
}

export default CartFileRepository;
import ProductDTO from '../../dto/product.dto';
import { logger } from '../../../utils/logger';
import {v4 as uuidv4} from 'uuid';

import fs from 'fs';
import createFolder from '../../../utils/fs/folders.utils';

import AppError from '../../../middlewares/error.middleware';
import { FullProductInterface, IProductRepository, ProductInterface } from '../../../interfaces/product.interfaces';

class ProductFileRepository implements IProductRepository{
    public static instance: ProductFileRepository;
    private folderName : string;
    private fileName : string;
    private ruta: string;

    constructor(_nombreArchivo : string){
        this.folderName = 'tmp/db/';
        this.fileName = `${_nombreArchivo}.txt`;
        this.ruta = this.folderName + this.fileName;
        this.createFile();
    }

    static getInstance(_nombreArchivo : string) : ProductFileRepository{
        if (!this.instance){
            this.instance = new ProductFileRepository(_nombreArchivo);
            logger.info(`Products Repository: File ${this.instance.ruta} used`);
        }

        return this.instance
    }

    async createFile() : Promise<void> {
        await createFolder(this.folderName);
        try{
            const exists = fs.existsSync(this.ruta);
            if (!exists) {
                await fs.promises.writeFile(this.ruta, "");
                logger.info(`Products Repository: File ${this.ruta} created`)
            }
        } catch (err : any) {
            logger.error(`Products Repository: Error creating file:${err.message}`)
        }
    }

    async getAll() : Promise<FullProductInterface[]>{
        try{
            const contenido = await fs.promises.readFile(this.ruta, 'utf-8');
            if (contenido == ""){
                let data : [] = [];
                return data;
            }
            const data : FullProductInterface[] = JSON.parse(contenido);
            return data;
        } catch (err : any){
            throw new AppError(err.message, 'File data process', 'Products Repository','getAll() error', 500 );
        }
    }
    async append(productData : ProductInterface) : Promise<FullProductInterface>{
        try{
            const objetosExistentes : ProductInterface[] = await this.getAll();
            const _id : string = uuidv4();

            const productDTO : ProductInterface = new ProductDTO(productData);
            const newProduct : FullProductInterface = {...productDTO, _id:_id}
            objetosExistentes.push(newProduct);

            const data : string = JSON.stringify(objetosExistentes);
            await fs.promises.writeFile(this.ruta, data)
            return newProduct
        } catch (err : any){
            throw new AppError(err.message, 'File data process', 'Products Repository','append() error', 500 );
        }
    }
    async getByCondition( fieldName : keyof FullProductInterface = "_id", fieldValue : string) : Promise<FullProductInterface | null>{
        try{
            const objetosExistentes : FullProductInterface[] = await this.getAll();
            const query : FullProductInterface[] = objetosExistentes.filter(it => it[fieldName] === fieldValue);
            if ( !query?.length ) {
                return null;
            }
            return query[0];
        } catch(err : any) {
            throw new AppError(err.message, 'File data process', 'Products Repository','getByCondition(fieldName, fieldValue) error', 500 );
        }
    }
    async deleteByCondition( fieldName : keyof FullProductInterface = "_id", fieldValue : string) : Promise<boolean> {
        try{
            const objetosExistentes : FullProductInterface[] = await this.getAll();
            const filteredObject : FullProductInterface[] = objetosExistentes.filter(it => it[fieldName] != fieldValue);

            if ( objetosExistentes === filteredObject ) {
                return false
            }
            const data : string = JSON.stringify(filteredObject);
            await fs.promises.writeFile(this.ruta, data);
            return true;
        } catch(err : any) {
            throw new AppError(err.message, 'File data process', 'Products Repository','deleteByCondition(fieldName, fieldValue) error', 500 );
        }
    }
    async deleteAll() : Promise<boolean> {
        try{
            await fs.promises.writeFile(this.ruta, "");
            return true
        } catch(err : any) {
            throw new AppError(err.message, 'File data process', 'Products Repository','deleteAll error', 500 );
        }
    }
}

export default ProductFileRepository;
import { logger } from '../../../utils/logger';
import { v4 as uuidv4 } from 'uuid';

import fs from 'fs';
import createFolder from '../../../utils/fs/folders.utils';

import AppError from '../../../middlewares/error.middleware';

import {IUserRepository, UserInterface , FullUserInterface } from '../../../interfaces/user.interfaces';

class UserFileRepository implements IUserRepository{
    public static instance: UserFileRepository;
    private folderName : string;
    private fileName: string;
    private ruta: string;
    
    constructor(_nombreArchivo : string){
        this.folderName = 'tmp/db/';
        this.fileName = `${_nombreArchivo}.txt`;
        this.ruta = this.folderName + this.fileName;
        this.createFile();
    }

    static getInstance(_nombreArchivo : string) : IUserRepository{
        if (!this.instance){
            this.instance = new UserFileRepository(_nombreArchivo);
            logger.info(`Users Repository: File ${this.instance.ruta} used`);
        }
        return this.instance
    }

    async createFile() : Promise<void> {
        await createFolder(this.folderName);
        try{
            const exists = fs.existsSync(this.ruta);
            if (!exists) {
                await fs.promises.writeFile(this.ruta, "");
                logger.info(`Users Repository: File ${this.ruta} created`)
            }
        } catch (err : any) {
            logger.error("Users Repository: Error creating file", err.message);
        }
    }
    
    async getAll() : Promise<FullUserInterface[]>{
        try{
            const contenido = await fs.promises.readFile(this.ruta, 'utf-8');
            if (contenido == ""){
                let data : [] = [];
                return data;
            }
            const data : FullUserInterface[] = JSON.parse(contenido);
            return data;
        } catch (err : any){
            throw new AppError(err.message, 'File data process', 'Users Repository','getAll() error', 500 );
        }
    }

    async append(userData : UserInterface) : Promise<FullUserInterface> { 
        try{
            const objetosExistentes : UserInterface[] = await this.getAll();
            const _id : string = uuidv4();

            const newUser : FullUserInterface = {...userData, _id: _id};
            objetosExistentes.push(newUser);

            const data : string = JSON.stringify(objetosExistentes);
            await fs.promises.writeFile(this.ruta, data)
            return newUser
        } catch (err : any){
            throw new AppError(err.message, 'File data process', 'Users Repository','append(userData) error', 500 );
        }
    }

    async getByCondition( fieldName : keyof FullUserInterface = "_id", fieldValue : string ) : Promise<FullUserInterface | null> {
        try{
            const objetosExistentes : FullUserInterface[] = await this.getAll();
            const query : FullUserInterface[] = objetosExistentes.filter(it => it[fieldName] === fieldValue);
            if ( query?.length > 0 ) {
                return null;
            }
            return query[0];
        } catch(err : any) {
            throw new AppError(err.message, 'File data process', 'Users Repository','getByCondition(fieldName, fieldValue) error', 500 );
        }
    }

    async getPasswordByUserName( username : string) : Promise<string>{
        try{
            const objetosExistentes : FullUserInterface[]= await this.getAll();
            const query : FullUserInterface[] = objetosExistentes.filter(it => it.username === username);
            if ( query?.length > 0 ) {
                return ""
            }
            return query[0].password;    
        } catch(err : any) {
            throw new AppError(err.message, 'File data process', 'Users Repository','getPasswordByUserName(username) error', 500 );
        }
    }

    async deleteByCondition( fieldName : keyof FullUserInterface = "_id", fieldValue : string) : Promise<boolean>{
        try{
            const objetosExistentes : FullUserInterface[] = await this.getAll();           
            const filteredObject : FullUserInterface[] = objetosExistentes.filter(it => it[fieldName] != fieldValue);
            
            if ( objetosExistentes === filteredObject ) {
                return false
            }
            const data : string = JSON.stringify(filteredObject);
            await fs.promises.writeFile(this.ruta, data);
            return true;
        } catch(err : any) {
            throw new AppError(err.message, 'File data process', 'Users Repository','deleteByCondition(fieldName, fieldValue) error', 500 );
        }
    }

    async deleteAll() : Promise<boolean>{
        try{
            await fs.promises.writeFile(this.ruta, "");
            return true
        } catch(err: any) {
            throw new AppError(err.message, 'File data process', 'Users Repository','deleteAll error', 500 );
        }
    }
}

export default UserFileRepository;
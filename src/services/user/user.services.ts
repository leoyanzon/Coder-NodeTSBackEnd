import UserFactory from '../../dao/user.factory';

import EncryptService from '../../utils/encrypt/encrypt.service';
const encryptService = new EncryptService();

import AppError from '../../middlewares/error.middleware';

import { IUserRepository, FullUserInterface, UserInterface } from '../../interfaces/user.interfaces';

class UserServices{
    public userFactory : IUserRepository;

    constructor(){
        this.userFactory = UserFactory.getInstance();
    }

    getAll = async() : Promise<FullUserInterface[]>  =>{
        try {
            const data : FullUserInterface[] = await this.userFactory.getAll();
            return data;
        } catch(err: any){
            throw new AppError(err.message, 'Data process', 'Users Services','getAll error', 500 );
        }
    }
    getById = async( _id : string | null ) : Promise<FullUserInterface | null> => {
        try{
            if (_id === null) return null
            const data : FullUserInterface | null = await this.userFactory.getByCondition('_id', _id);
            return data
        } catch(err : any){
            throw new AppError(err.message, 'Data process', 'Users Services','getByCondition error', 500 );
        }
    }
    getByUserName = async( username : string ) : Promise<FullUserInterface | null> => {
        try{
            const data : FullUserInterface | null = await this.userFactory.getByCondition('username', username);
            return data
        } catch(err: any){
            throw new AppError(err.message, 'Data process', 'Users Services','getByCondition error', 500 );
        }
    }

    userExists = async( username : string ) : Promise<boolean> => {
        try{
            const data : FullUserInterface | null = await this.userFactory.getByCondition('username', username);
            if (data === null) {
                return false
            }
            return true
        } catch(err : any){
            throw new AppError(err.message, 'Data process', 'Users Services','userExists error', 500 );
        }
    }
    passwordCheck = async( username: string, password : string ) : Promise<boolean> => {
        try{
            const data : string = await this.userFactory.getPasswordByUserName(username);
            if (!data)  return false;
            const passwordChecked : boolean = await encryptService.checkPassword('argon2', password, data);
            if (!passwordChecked) return false
            return true
        } catch(err: any){
            throw new AppError(err.message, 'Data process', 'Users Services','passwordCheck error', 500 );
        }
    }
    append = async(userData : UserInterface ) : Promise<FullUserInterface> =>{
        try {
            const hashedPassword : string = await encryptService.hashPassword('argon2', userData.password);
            userData.password = hashedPassword;
            const newUser : UserInterface= {...userData};
            const data : FullUserInterface = await this.userFactory.append(newUser);
            return data
        } catch(err : any){
            throw new AppError(err.message, 'Data process', 'Users Services','append error', 500 );
        }
    }
    deleteById = async( _id : string ) : Promise<boolean> =>{
        try {
            const data : boolean = await this.userFactory.deleteByCondition('_id', _id);
            return data
        } catch(err : any){
            throw new AppError(err.message, 'Data process', 'Users Services','deleteById error', 500 );
        }
    }
    deleteAll = async() : Promise<boolean> =>{
        try {
            const data : boolean = await this.userFactory.deleteAll();
            return data
        } catch(err : any){
            throw new AppError(err.message, 'Data process', 'Users Services','deleteById error', 500 );
        }
    }
}

export default UserServices;
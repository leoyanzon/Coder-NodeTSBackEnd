export interface UserInterface {
    fullName : string,
    username: string,
    address: string,
    age: number,
    email: string,
    avatar?: string | undefined,
    password: string
}

export interface FullUserInterface extends UserInterface {
    _id: string,
    password: string
}

export interface IUserRepository{
    getAll() : Promise<FullUserInterface[]>;
    append(userData : UserInterface) : Promise<FullUserInterface>;
    getByCondition( fieldName : keyof FullUserInterface, fieldValue : string ) : Promise<FullUserInterface | null>;
    getPasswordByUserName( username : string) : Promise<string>;
    deleteByCondition( fieldName : keyof FullUserInterface, fieldValue : string) : Promise<boolean>;
    deleteAll() : Promise<boolean>;
}
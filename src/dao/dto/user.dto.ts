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

class UserDTO {
    fullName : string;
    username: string;
    address: string;
    age: number;
    email: string;
    avatar: string | undefined;
    constructor(data : UserInterface) {
        this.fullName = data.fullName;
        this.username = data.username;
        this.address = data.address;
        this.age = data.age;
        this.email = data.email;
        this.avatar = data.avatar;
    }

    build() : UserDTO{
        return this;
    }
}

export default UserDTO;
export interface UserInterface {
    _id?: string,
    fullName : string,
    username: string,
    address: string,
    age: number,
    email: string,
    avatar?: string | undefined
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
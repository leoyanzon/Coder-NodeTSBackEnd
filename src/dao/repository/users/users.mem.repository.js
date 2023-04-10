const UserDTO = require('../../dto/user.dto');

class UsersMemRepository{
    constructor(){
        this.users = [];
    }

    async createUser(userData){
        userDTO = new UserDTO(userData).build();
        this.users.push(userDTO)
        console.info(userDTO);
        return await userDTO;
    }
}

module.exports = UsersMemRepository;
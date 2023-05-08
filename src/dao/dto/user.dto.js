const EncryptService = require('../../services/encrypt/encrypt.service');
const encryptService = new EncryptService();

class UserDTO{
    constructor(data, hashedPassword){
        this.fullName = data.fullName,
        this.username = data.username,
        this.address = data.address,
        this.age = data.age,
        this.phone = data.phone,
        this.password = hashedPassword,
        this.avatar = data.avatar
    }

    static async build(data){
        const hashedPassword = await encryptService.hashPassword('argon2', data.password);
        this.instance = new UserDTO(data, hashedPassword);
        return this.instance
    }
}

module.exports = UserDTO;
const bcrypt = require('bcrypt');
const saltRounds = 10;

class BcryptService {
    constructor() {}

    async hashPassword(password){
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword
    }

    async checkPassword(plainPassword, passwordHash){
        return await bcrypt.compare(plainPassword, passwordHash)
    }
}

module.exports = BcryptService;

const bcrypt = require('bcrypt');
const saltRounds = 10;

class BcryptService {
    constructor() {}

    async hashPassword(password){
        return await bcrypt.hash(password, saltRounds, ( hash ) => {
            return hash
        })
    }

    async checkPassword(plainPassword, passwordHash){
        return await bcrypt.compare(plainPassword, passwordHash)
    }
}

module.exports = BcryptService;

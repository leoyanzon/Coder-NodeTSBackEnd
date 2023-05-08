const bcrypt = require('bcrypt');
const saltRounds = 10;

const argon2 = require('argon2');

const { logger } = require('../logger/index');

class EncryptService {
    constructor() {}

    async hashPassword( method = 'default', password){
        try{
            if (method == 'bcrypt'){
                const hashedPassword = await bcrypt.hash(password, saltRounds);
                return hashedPassword
            }
            const hashedPassword = await argon2.hash(password);
            return hashedPassword
        } catch(err) {
            return undefined
        }
    }

    async checkPassword( method = 'default', plainPassword, passwordHash){
        try{
            if (method == 'bcrypt'){
                return await bcrypt.compare(plainPassword, passwordHash)
            }
            return await argon2.verify(passwordHash, plainPassword)
        } catch(err) {
            return undefined
        }
    }
}

module.exports = EncryptService;

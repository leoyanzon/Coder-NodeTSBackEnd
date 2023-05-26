import bcrypt from 'bcrypt';
import argon2 from 'argon2';

const saltRounds = 10;

class EncryptService {
    constructor() {}

    async hashPassword( method : string = 'default', password : string) : Promise<string> {
        try{
            if (method == 'bcrypt'){
                const hashedPassword = await bcrypt.hash(password, saltRounds);
                return hashedPassword
            }
            const hashedPassword = await argon2.hash(password);
            return hashedPassword
        } catch(err) {
            return ""
        }
    }

    async checkPassword( method : string = 'default', plainPassword : string, passwordHash : string) : Promise<boolean>{
        try{
            if (method == 'bcrypt'){
                return await bcrypt.compare(plainPassword, passwordHash)
            }
            return await argon2.verify(passwordHash, plainPassword)
        } catch(err) {
            return false
        }
    }
}

export default EncryptService;

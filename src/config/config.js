const dotenv = require('dotenv');
const path = require('path');

class Config {

    constructor(argv){
        dotenv.config({
            path: path.resolve(process.cwd(), `./src/config/${argv.mode}.env`)
        });

        this.config = {
            server: {
                ENVIRONMENT: argv.mode,
                HOST: process.env.HOST || 'localhost',
                SERVER_PORT: argv.port || process.env.SERVER_PORT || 8080,
                SESSION_STORAGE: process.env.SESSION_STORAGE || "MEM"
            },
            cookies: {
                COOKIES_SECRET: process.env.COOKIES_SECRET || 'undefined',
            },
            db: {
                DB_NAME: process.env.DB_NAME || 'Ecommerce',
                DATA_STORAGE: process.env.DATA_STORAGE || 'FILE',
                MONGO_URI: process.env.MONGO_URI || 'undefined',
                MONGO_ATLAS_URL: process.env.MONGO_ATLAS_URL || 'undefined',
            },
            logger: {
                PINO_LOG_LEVEL: process.env.PINO_LOG_LEVEL || 'info'
            },
            email:  {
                EMAIL_USER: process.env.EMAIL_USER || 'undefined',
                EMAIL_PASS: process.env.EMAIL_PASS || 'undefined',
            },
            whatsapp: {
                TWILIO_SID: process.env.TWILIO_SID || 'undefined',
                TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || 'undefined',
            },
        }


    }

    static getInstance(argv){
        if (!this.instance){
            this.instance = new Config(argv);
        }
        return this.instance.config;
    }
}

module.exports = Config;
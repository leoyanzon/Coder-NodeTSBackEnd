import * as dotenv from 'dotenv';
import path from 'path';

export interface ConfigObject{
    server: {
        ENVIRONMENT: string,
        HOST: string,
        SERVER_PORT: string,
        SESSION_STORAGE: string
    },
    cpu: {
        MODE: string
    },
    cookies: {
        COOKIES_SECRET: string
    },
    db: {
        DB_NAME: string,
        DATA_STORAGE: string,
        MONGO_URI: string,
        MONGO_ATLAS_URL: string,
    },
    logger: {
        LOGGER: string,
        LOG_LEVEL: string,
    },
    email:  {
        EMAIL_USER: string,
        EMAIL_PASS: string,
    },
    whatsapp: {
        TWILIO_SID: string,
        TWILIO_AUTH_TOKEN: string,
    },

}

class Config {
    public static instance: Config;
    public config : ConfigObject;

    public constructor(argv: any){ // Argv luego debere declararlo mas especifico, como Record<string, any>
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
            cpu: {
                MODE: argv.cpu || "fork"
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
                LOGGER: 'pino',
                LOG_LEVEL: process.env.LOG_LEVEL || 'info',
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

    public static getInstance(argv: any) : Config {
        if (!this.instance){
            this.instance = new Config(argv);
        }
        return this.instance;
    }
}

export default Config;
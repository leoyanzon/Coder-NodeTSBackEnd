require('dotenv').config();

const config = {
    SERVER_PORT: process.env.SERVER_PORT,
    ENVIRONMENT: process.env.ENVIRONMENT,
    COOKIES_SECRET: process.env.COOKIES_SECRET,
    SESSION_STORAGE: process.env.SESSION_STORAGE,
    MONGO_URI: process.env.MONGO_URI,
    MONGO_ATLAS_URL: process.env.MONGO_ATLAS_URL,
    TWILIO_SID: process.env.TWILIO_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    PINO_LOG_LEVEL: process.env.PINO_LOG_LEVEL
}
module.exports = config;
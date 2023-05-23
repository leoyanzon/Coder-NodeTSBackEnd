import twilio from 'twilio';

import configLoader from '../../loaders/config.loader';
const config = configLoader();

import { logger } from '../logger/index';

interface returnMessage {
    success: boolean,
    message: string
}

const sendWhatsapp = async (msg = 'No message', to = 'whatsapp:+5493874137312', from = 'whatsapp:+14155238886') : Promise<returnMessage> => {
    try{
        const accountSid = config.whatsapp.TWILIO_SID;
        const authToken = config.whatsapp.TWILIO_AUTH_TOKEN;
        const client = twilio(accountSid, authToken);

        const message = await client.messages.create({
                from,
                body: msg,
                to,
            });
        logger.info(`Whatsapp message sent with sid:${ message.sid }`);
        return {
            success: true,
            message: message.sid
        }
    } catch (err : any) {
        logger.error(`Twilio error: ${err.message}`);
        return {
            success: false,
            message: err.message,
        }

    }
}

export default sendWhatsapp;
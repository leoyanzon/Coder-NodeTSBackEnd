const auth = require('basic-auth');
const twilio = require('twilio');

const config = require('../../loaders/config.loader')();

const { logger } = require('../logger/index');

const sendWhatsapp = async (msg = 'No message', to = 'whatsapp:+5493874137312', from = 'whatsapp:+14155238886') => {
    try{
        const accountSid = config.whatsapp.TWILIO_SID;
        const authToken = config.whatsapp.TWILIO_AUTH_TOKEN;
        const client = twilio(accountSid, authToken);

        const message = await client.messages.create({
                from,
                body: msg,
                to,
            });
        return {
            success: true,
            message: message.sid
        }
    } catch (err) {
        logger.error(`Twilio error: ${err.message}`);
        return {
            success: false,
            message: err,
        }

    }
}

module.exports = sendWhatsapp;
const auth = require('basic-auth');
const twilio = require('twilio');

const config = require('../../config/config');

const { logger } = require('../logger/index');

const sendWhatsapp = ( msg = 'No message', to = 'whatsapp:+5493874137312', from = 'whatsapp:+14155238886' ) => {
    try{
        const accountSid = config.whatsapp.TWILIO_SID;
        const authToken = config.whatsapp.TWILIO_AUTH_TOKEN;
        const client = twilio(accountSid, authToken);

        client.messages
            .create({
                from,
                body: msg,
                to,
            })
            .then(message => logger.info(message.sid))
            .catch(err => logger.error(err));
    } catch (err) {
        logger.error(err);
    }
}

module.exports = sendWhatsapp;
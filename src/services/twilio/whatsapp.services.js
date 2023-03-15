const auth = require('basic-auth');
const twilio = require('twilio');

const { logger } = require('../logger/index');

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

const sendWhatsapp = ( msg = 'No message', to = 'whatsapp:+5493874137312', from = 'whatsapp:+14155238886' ) => {
    client.messages
    .create({
        body: msg,
        from,
        to
    })
    .then(message => logger.info(message.sid))
    .done();
}

module.exports = sendWhatsapp;
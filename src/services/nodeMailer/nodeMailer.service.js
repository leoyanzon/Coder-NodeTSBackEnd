const nodemailer = require('nodemailer');

const { logger } = require('../logger/index');

const config = require('../../config/config');

const sendEmail = async (msg, destination) => {

    const emailSender = config.EMAIL_USER + '@gmail.com'
    const transportOptions = {
        service: 'gmail',
        port: 587,
        auth: {
            user: config.EMAIL_USER,
            pass: config.EMAIL_PASS
        }
    };   
    const transporter = nodemailer.createTransport(transportOptions);
    
    try{
        const emailOptions = {
            from: 'Ecommerce app',
            to: destination,
            subject: 'New account created!',
            html: `<h1>Congratulations for your new account!</h1>
                   <p>${msg}</p>` 
                  
        }

        const result = await transporter.sendMail(emailOptions);
    } catch (err) {
        logger.info(config)
        logger.error(err);

    }
}

module.exports = sendEmail;



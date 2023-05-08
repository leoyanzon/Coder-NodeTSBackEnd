const nodemailer = require('nodemailer');

const { logger } = require('../logger/index');

const config = require('../../config/config');

const sendEmail = async (msg, destination) => {

    const emailSender = config.email.EMAIL_USER + '@gmail.com'
    const transportOptions = {
        service: 'gmail',
        port: 587,
        auth: {
            user: config.email.EMAIL_USER,
            pass: config.email.EMAIL_PASS
        }
    };   
    const transporter = nodemailer.createTransport(transportOptions);
    
    try{
        const emailOptions = {
            from: emailSender,
            to: destination,
            subject: 'New account created!',
            html: `<h1>Congratulations for your new account!</h1>
                   <p>${msg}</p>` 
                  
        }

        const result = await transporter.sendMail(emailOptions);
        return {
            success: true,
            message: result
        };
    } catch (err) {
        logger.error(`NodeMailer error: ${err.message}`);
        return{
            success: false,
            message: err.message
        }
    }
}

module.exports = sendEmail;



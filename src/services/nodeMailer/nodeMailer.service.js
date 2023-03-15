const nodemailer = require('nodemailer');

const sendEmail = async (msg, destination) => {

    const emailSender = process.env.EMAIL_USER + '@gmail.com'
    const transportOptions = {
        service: 'gmail',
        port: 587,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
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
        logger.err(err);
    }
}

module.exports = sendEmail;



import nodemailer from 'nodemailer';

import { logger } from '../logger/index';

import configLoader from '../../loaders/config.loader';
const config = configLoader();

interface returnMessage {
    success: boolean,
    message: any
}

const sendEmail = async (subject : string ="", msg : string, destination : string) : Promise<returnMessage> => {
    
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
            subject: subject,
            html: `<h1>Congratulations for your new account!</h1>
                   <p>${msg}</p>` 
                  
        }

        const result = await transporter.sendMail(emailOptions);
        logger.info(`Email message sent:${result}`);
        return {
            success: true,
            message: result
        };
    } catch (err : any) {
        logger.error(`NodeMailer error: ${err.message}`);
        return{
            success: false,
            message: err.message
        }
    }
}

export default sendEmail;



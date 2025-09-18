
import nodemailer from "nodemailer";

 const sendEmail =  (to, subject, message ) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
        
    });
         transporter.sendMail({
            from: `"Password Reset" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html: message 
    });
}

export default sendEmail;
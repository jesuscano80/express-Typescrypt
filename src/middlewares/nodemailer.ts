import nodemailer from "nodemailer"

// Crear una instancia de un transportador de correo electrónico
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-password'
    }
});

const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'recipient-email@gmail.com',
    subject: 'Asunto del correo electrónico',
    text: 'Contenido del correo electrónico',
    html:''
};


export  {transporter, mailOptions};
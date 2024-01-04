const nodemiler = require('nodemailer');

const sendEmail = (name, email, confirmationCode, domain) => {
    return new Promise((resolve, reject) => {
        const mailTransporter = nodemiler.createTransport({
            host: 'smtp.gmail.com', port: 465, secure: true, tls: { rejectUnauthorized: true },
            auth: { user: process.env.CORREO, pass: process.env.PASSWORD }
        })
        const mailOptions = {
            from: 'mjimenezd1994@gmail.com', to: email, subject: 'Confirme su cuenta',
            html:
                `<h1>Correo de confirmación</h1>
                <h2>Hola ${name || ''}</h2>
                <p>Gracias por su suscripción. Por favor, confirme su correo electrónico, ingresando al siguiente enlace: </p>
                <a href=${domain}/api/auth/confirm/${confirmationCode}> Entre aquí</a>
                </div>` }
        mailTransporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                reject(error);
            } else {
                resolve(true);
            }
        })
    })
}

module.exports = {
    sendEmail
}
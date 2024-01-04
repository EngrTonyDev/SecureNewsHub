const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


const sendSMS = (phoneNumber) => {
    return new Promise((resolve, reject) => {

        const code = Math.floor(100000 + Math.random() * 900000);

        client.messages
            .create({
                body: `Su codigo es: ${code}`,
                from: '+16028337927',
                to: phoneNumber
            })
            .then(message => {
                resolve({ code })
            }).catch(err => {
                reject(err)
            });
    });
}

module.exports = {
    sendSMS
}

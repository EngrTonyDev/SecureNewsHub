const axios = require('axios');
const accountSid = 'AC7c4875d6935e06ce20f9b42378b1a8a2';
const authToken = '5113cc3834ce380811b6e4ac7bec8065';

const client = require('twilio')(accountSid, authToken);


const sendSMSt = (phoneNumber) => {//textbelt only one sms a day
  return new Promise((resolve, reject) => {
    const code = Math.floor(100000 + Math.random() * 900000);


    const url = `https://textbelt.com/text`;

    const params = {
      phone: `+506${phoneNumber}`,
      message: `Su codigo es: ${code}`,
      key: 'textbelt'
    };

    axios.post(url, params)
      .then(response => {
        console.log("response.data");
        console.log(response.data);
        resolve({ code });
      })
      .catch(error => {
        console.log("error");
        console.error(error);
        reject(error);
      });
  });
}


const sendSMS = (phoneNumber) => {//Twilio
  return new Promise((resolve, reject) => {
    const code = Math.floor(100000 + Math.random() * 900000);

    client.messages
      .create({
        body: `Su codigo es: ${code}`,
        from: `+15005550006`,

        //to: `+506${phoneNumber}`//my numero
        to: '+50689630917'
      
       
      })
      .then(message => {
       
        console.log(message);//recibo esta respueta
        resolve({ code });
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
}



module.exports = {
  sendSMS
}
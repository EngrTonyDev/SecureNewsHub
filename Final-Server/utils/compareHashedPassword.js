const bcrypt = require('bcrypt');

const compareHashedPassword = (encrypted, password) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, encrypted, (err, res) => {
            if (err) {
                return resolve(false);
            }
            return resolve(res);
        })
    })
}

module.exports = {
    compareHashedPassword
}
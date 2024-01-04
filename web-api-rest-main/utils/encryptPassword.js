const bcrypt = require('bcrypt');



const encryptPassword = (password) => {
    if (!password || password === '') return
    const salt = bcrypt.genSaltSync(10);
    const passwordEncrypted = bcrypt.hashSync(password, salt);
    return passwordEncrypted;
}

module.exports = {
    encryptPassword
}
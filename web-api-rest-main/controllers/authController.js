const jwt = require('jsonwebtoken');

const User = require("../models/usersModel");
const Role = require("../models/rolesModel");

const { sendEmail } = require("../utils/sendEmail");
const { generateUrl } = require("../utils/generateUrl");
const { encryptPassword } = require("../utils/encryptPassword");
const { compareHashedPassword } = require("../utils/compareHashedPassword");
const { sendSMS } = require('../utils/sendSMS');

/**
 * Creates a Users
 *
 * @param {*} req
 * @param {*} res
 */

// Registra el usuario y envia el correo para activar la cuenta
const registerPost = async (req, res) => {

    const rol = await Role.findOne({ name: 'User' });

    if (!rol) {
        return res.status(500).json("Error interno en el servidor");
    }

    //Cuando se registra el usario, se genera el codigo de confirmación
    const confirmCode = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET);
    const password = encryptPassword(req.body.password);

    const user = new User({
        email: req.body.email,
        password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        address1: req.body.address1,
        address2: req.body.address2,
        country: req.body.country,
        city: req.body.city,
        number: req.body.number,
        confirmCode,
        role: rol,
    });
    user.save(async (error) => {
        if (error) {
            return res.status(500).json({ msg: error });
        }
        const response = await sendEmail(user.first_name, user.email, confirmCode, generateUrl(req));
        if (!response) {
            return res.status(500).json({ msg: "Error al enviar el correo, por favor, ponerse en contacto con el administrador" });
        }
        return res.json({ msg: "Usuario registrado, por favor, revise su correo, para activar la cuenta" });
    });

};

// Confirma la cuenta con el correo enviado
const confirmAccountGet = async (req, res) => {
    User.findOne({ confirmCode: req.params.confirmationCode })
        .then((user) => {
            if (!user) {
                return res.status(404).send({ message: "Usuario no encontrado" });
            }

            user.status = "Active";
            user.save((err) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                return res.send('Cuenta confirmada, ya puede iniciar sesión');
            });
        })
        .catch((e) => console.log("error", e));
}


// const loginPost = async (req, res) => {
//     User.findOne({ email: req.body.email })
//         .exec(async function (err, user) {

//             if (err) {
//                 return res.status(500).json({ msg: err });
//             }

//             if (!user) {
//                 return res.status(401).json({ msg: 'Correo o contraseña incorrecta' });
//             }

//             const result = await compareHashedPassword(user.password, req.body.password);

//             if (!result) {
//                 return res.status(401).json({ msg: 'Correo o contraseña incorrecta' });
//             } else {
//                 const token = jwt.sign({ ...user.toObject() }, process.env.JWT_SECRET, { expiresIn: "2h" });
//                 return res.json({ msg: 'Logueado', token });
//             }
//         });
// }

// Login con autenticacion de dos pasos (Envia el codigo al celular)
const login2FAPost = async (req, res) => {
    User.findOne({ email: req.body.email })
        .exec(async function (err, user) {

            if (err) {
                return res.status(500).json(err);
            }
            if (!user) {
                return res.status(401).json({ msg: 'Correo o contraseña incorrecta' });
            }

            const result = await compareHashedPassword(user.password, req.body.password);

            if (!result) {
                return res.status(401).json({ msg: 'Correo o contraseña incorrecta' });
            }

            if (user.status !== 'Active') {
                return res.status(401).json({ msg: 'Cuenta no verificada' });
            }

            const response = await sendSMS(user.number);

            if (response && response.code) {
                user.phoneCode = response.code;
                user.save((err) => {
                    if (err) {
                        return res.status(500).send({ msg: err });
                    }
                    return res.json({ msg: 'Codigo enviado' });
                });
            } else {
                return res.status(500).json({ msg: 'Error al enviar el codigo, intente mas tarde' });
            }

        });
}

// Verifica el codigo enviado al celular y crea el token de logueo
const verifyPhoneCode = async (req, res) => {
    User.findOne({ email: req.body.email, phoneCode: req.body.phoneCode }).populate('role')
        .exec(async function (err, user) {

            if (err) {
                return res.status(500).json(err);
            }

            if (!user) {
                return res.status(401).json({ msg: 'Codigo incorrecto' });
            }

            const token = jwt.sign({ ...user.toObject() }, process.env.JWT_SECRET, { expiresIn: "2h" });
            return res.json({ msg: 'Logueado', token });
        });
}

module.exports = {
    registerPost,
    confirmAccountGet,
    // loginPost,
    login2FAPost,
    verifyPhoneCode
}
const User = require("../models/usersModel");
const Rol = require("../models/rolesModel")

/**
 * Creates a Users
 *
 * @param {*} req
 * @param {*} res
 */
const userPost = async (req, res) => {
  var user = new User();

  const rol = await Rol.findById(req.body.rol_id);


  user.email = req.body.email;
  user.password = req.body.password;
  user.first_name = req.body.first_name;
  user.last_name = req.body.last_name;
  user.address1 = req.body.address1;
  user.address2 = req.body.address2;
  user.country = req.body.country;
  user.city = req.body.city;
  user.number = req.body.number;

  //user.rol = rol;

  //console.log(user.rol.rol_id);


  if (user.email
    && user.password
    && user.first_name
    && user.last_name
    && user.address1
    && user.address2
    && user.country
    && user.city
    && user.number
    //&& rol
  ) {
    user.save(function (err) {
      if (err) {
        res.status(422);
        console.log('Error while saving the user', err)
        res.json({
          error: 'There was an error saving the user'
        });
      }
      res.status(201);//CREATED
      res.header({
        'location': `http://localhost:3000/api/users/?id=${user.id}`
      });
      res.json(user);
    });
  } else {
    res.status(422);
    console.log('Error while saving the user')
    res.json({
      error: 'No valid data provided for user'
    });
  }
};


const userSession = async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;


  if (email && password
  ) {
    User.findOne({ email: email }, function (err, user) {
      if (err) {
        res.status(404);
        console.log('Error while queryting the user', err)
        res.json({ error: "User doesnt exist" })
      }
      else {
        if (user.password == password) {
          res.status(201);
          res.json(user);
        } else {
          res.status(422);
          res.json({
            error: 'No valid user or passoword'
          });
        }
      }
    });
  } else {
    res.status(422);
    console.log('Error while saving the user')
    res.json({
      error: 'No valid data provided for user'
    });
  }
};

/**
 * Get all Users
 *
 * @param {*} req
 * @param {*} res
 */

const userGet = (req, res) => {
  // if an specific User is required
  if (req.query && req.query.id) {
    User.findById(req.query.id, function (err, user) {
      if (err) {
        res.status(404);
        console.log('Error while queryting the user', err)
        res.json({ error: "User doesnt exist" })
      }
      res.json(user);
    });
  } else {
    // get all Users
    User.find(function (err, users) {
      if (err) {
        res.status(422);
        res.json({ "error": err });
      }
      res.json(users);
    });

  }
};

/**
 * Delete one User
 *
 * @param {*} req
 * @param {*} res
 */
const userDelete = (req, res) => {
  // if an specific User is required
  if (req.query && req.query.id) {
    User.findById(req.query.id, function (err, user) {
      if (err) {
        res.status(500);
        console.log('Error while queryting the user', err)
        res.json({ error: "user doesnt exist" })
      }
      //if the user exists
      if (user) {
        user.remove(function (err) {
          if (err) {
            res.status(500).json({ message: "There was an error deleting the user" });
          }
          res.status(204).json({});
        })
      } else {
        res.status(404);
        console.log('Error while queryting the user', err)
        res.json({ error: "user doesnt exist" })
      }
    });
  } else {
    res.status(404).json({ error: "You must provide a User ID" });
  }
};

/**
 * Updates a User
 *
 * @param {*} req
 * @param {*} res
 */
const userPatch = (req, res) => {
  // get User by id
  if (req.query && req.query.id) {
    User.findById(req.query.id, function (err, user) {
      if (err) {
        res.status(404);
        console.log('Error while queryting the user', err)
        res.json({ error: "User doesnt exist" })
      }

      // update the user object (patch)
      user.email = req.body.email ? req.body.email : user.email;
      user.password = req.body.password ? req.body.password : user.password;
      user.first_name = req.body.first_name ? req.body.first_name : user.first_name;
      user.last_name = req.body.last_name ? req.body.last_name : user.last_name;
      user.address1 = req.body.address1 ? req.body.address1 : user.address1;
      user.address2 = req.body.address2 ? req.body.address2 : user.address2;
      user.country = req.body.country ? req.body.country : user.country;
      user.city = req.body.city ? req.body.city : user.city;
      user.number = req.body.number ? req.body.number : user.number;

      user.save(function (err) {
        if (err) {
          res.status(422);
          console.log('Error while saving the user', err)
          res.json({
            error: 'There was an error saving the user'
          });
        }
        res.status(200); // OK
        res.json(user);
      });
    });
  } else {
    res.status(404);
    res.json({ error: "User doesnt exist" })
  }
};

module.exports = {
  userGet,
  userPost,
  userPatch,
  userDelete,
  userSession
}
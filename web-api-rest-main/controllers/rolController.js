const Rol = require("../models/rolesModel");

/**
 * Creates a Rol
 *
 * @param {*} req
 * @param {*} res
 */
const rolPost = (req, res) => {
  var rol = new Rol();

  rol.name = req.body.name;

  if (rol.name) {
    rol.save(function (err) {
      if (err) {
        res.status(422);
        console.log('Error while saving the rol', err)
        res.json({
          error: 'There was an error saving the rol'
        });
      }
      res.status(201);//CREATED
      res.header({
        'location': `http://localhost:3000/api/roles/?id=${rol.id}`
      });
      res.json(rol);
    });
  } else {
    res.status(422);
    console.log('Error while saving the rol')
    res.json({
      error: 'No valid data provided for rol'
    });
  }
};

/**
 * Get all Roless
 *
 * @param {*} req
 * @param {*} res
 */
const rolGet = (req, res) => {
  // if an specific rol is required
  if (req.query && req.query.id) {
    Rol.findById(req.query.id, function (err, rol) {
      if (err) {
        res.status(404);
        console.log('Error while queryting the rol', err)
        res.json({ error: "rol doesnt exist" })
      }
      res.json(rol);
    });
  } else {
    // get all roles
    Rol.find(function (err, roles) {
      if (err) {
        res.status(422);
        res.json({ "error": err });
      }
      res.json(roles);
    });

  }
};

/**
 * Delete one rol
 *
 * @param {*} req
 * @param {*} res
 */
const rolDelete = (req, res) => {
  // if an specific rol is required
  if (req.query && req.query.id) {
    Rol.findById(req.query.id, function (err, rol) {
      if (err) {
        res.status(500);
        console.log('Error while queryting the rol', err)
        res.json({ error: "Rol doesnt exist" })
      }
      //if the rol exists
      if(rol) {
        rol.remove(function(err){
          if(err) {
            res.status(500).json({message: "There was an error deleting the rol"});
          }
          res.status(204).json({});
        })
      } else {
        res.status(404);
        console.log('Error while queryting the rol', err)
        res.json({ error: "Rol doesnt exist" })
      }
    });
  } else {
    res.status(404).json({ error: "You must provide a rol id" });
  }
};

/**
 * Updates a rol
 *
 * @param {*} req
 * @param {*} res
 */
const rolPatch = (req, res) => {
  // get rol by id
  if (req.query && req.query.id) {
    Rol.findById(req.query.id, function (err, rol) {
      if (err) {
        res.status(404);
        console.log('Error while queryting the rol', err)
        res.json({ error: "Rol doesnt exist" })
      }

      // update the rol object (patch)
      rol.name = req.body.name ? req.body.name : rol.name;

      rol.save(function (err) {
        if (err) {
          res.status(422);
          console.log('Error while saving the rol', err)
          res.json({
            error: 'There was an error saving the rol'
          });
        }
        res.status(200); // OK
        res.json(rol);
      });
    });
  } else {
    res.status(404);
    res.json({ error: "Rol doesnt exist" })
  }
};

module.exports = {
  rolGet,
  rolPost,
  rolPatch,
  rolDelete
}
const Category = require("../models/categoriesModel");

/**
 * Creates a category
 * 
 * @param {*} req
 * @param {*} res
 */
const categoryPost = (req, res) => {
  var category = new Category();

  category.name = req.body.name;

  if (category.name) {
    category.save(function (err) {
      if (err) {
        res.status(422);
        console.log('Error while saving the category', err)
        res.json({
          error: 'There was an error saving the category'
        });
      }
      res.status(201);//CREATED
      res.header({
        'location': `http://localhost:3000/api/categories/?id=${category.id}`
      });
      return res.json({ data: category });
    });
  } else {
    res.status(422);
    console.log('Error while saving the category')
    res.json({
      error: 'No valid data provided for category'
    });
  }
};

/**
 * Get all categories
 *
 * @param {*} req
 * @param {*} res
 */
const categoryGet = (req, res) => {
  // if an specific category is required
  if (req.query && req.query.id) {
    Category.findById(req.query.id, function (err, category) {
      if (err) {
        res.status(404);
        console.log('Error while queryting the category', err)
        res.json({ error: "category doesnt exist" })
      }
      res.json(category);
    });
  } else {
    // get all categories
    Category.find(function (err, categories) {
      if (err) {
        return res.status(422).json({ "msg": 'Error al cargar las categorias' });
      }
      return res.json({ data: categories, msg: '' });
    });

  }
};

/**
 * Delete one category
 *
 * @param {*} req
 * @param {*} res
 */
const categoryDelete = (req, res) => {
  // if an specific category is required
  if (req.query && req.query.id) {
    Category.findById(req.query.id, function (err, category) {
      if (err) {
        res.status(500);
        console.log('Error while queryting the category', err)
        res.json({ error: "Category doesnt exist" })
      }
      //if the category exists
      if (category) {
        category.remove(function (err) {
          if (err) {
            res.status(500).json({ message: "There was an error deleting the category" });
          }
          res.status(204).json({});
        })
      } else {
        res.status(404);
        console.log('Error while queryting the category', err)
        res.json({ error: "Category doesnt exist" })
      }
    });
  } else {
    res.status(404).json({ error: "You must provide a category id" });
  }
};

/**
 * Updates a category
 *
 * @param {*} req
 * @param {*} res
 */
const categoryPatch = (req, res) => {
  // get category by id
  if (req.query && req.query.id) {
    Category.findById(req.query.id, function (err, category) {
      if (err) {
        res.status(404);
        console.log('Error while queryting the category', err)
        res.json({ error: "Category doesnt exist" })
      }

      // update the category object (patch)
      category.name = req.body.name ? req.body.name : category.name;

      category.save(function (err) {
        if (err) {
          res.status(422);
          console.log('Error while saving the category', err)
          res.json({
            error: 'There was an error saving the category'
          });
        }
        res.status(200); // OK
        return res.json({data: category});
      });
    });
  } else {
    res.status(404);
    res.json({ error: "Category doesnt exist" })
  }
};

module.exports = {
  categoryGet,
  categoryPost,
  categoryPatch,
  categoryDelete
}
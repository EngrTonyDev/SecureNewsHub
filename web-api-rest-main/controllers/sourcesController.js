let Parser = require('rss-parser');
let parser = new Parser();

const Source = require("../models/sourcesModel");
const User = require("../models/usersModel");
const Category = require("../models/categoriesModel");
const { processAndSaveNews, removeNewsBySource } = require('./newController');

/**
 * Creates a Source
 *
 * @param {*} req
 * @param {*} res
 */
const sourcePost = async (req, res) => {
	try {
		const category = await Category.findById(req.body.category_id);

		if (!category) {
			return res.status(409).json({ msg: 'Categoria no valida' });
		}

		const user = await User.findById(req.body.user_id);

		if (!user) {
			return res.status(409).json({ msg: 'Usuario no valida' });
		}

		const source = new Source({
			url: req.body.url,
			name: req.body.name,
			category: category,
			user: user
		});

		const sourceSaved = await source.save();

		let feed = await parser.parseURL(sourceSaved.url);
		const resultSaveNews = await processAndSaveNews(feed.items, sourceSaved, user, category);
		if (!resultSaveNews) {
			return res.status(500).json({ msg: 'Error al guardar las noticias' });
		}
		return res.status(201).json({ msg: 'Created', data: sourceSaved });
	} catch (error) {
		console.log(error)
		return res.status(500).json({ msg: error });
	}
};

/**
 * Get all sources
 *
 * @param {*} req
 * @param {*} res
 */
const sourceGet = (req, res) => {
	// if an specific source is required
	if (req.query && req.query.id) {
		Source.findById(req.query.id, function (err, source) {
			if (err) {
				res.status(404);
				console.log('Error while queryting the source', err)
				res.json({ error: "Source doesnt exist" })
			}
			res.json(source);
		});
	} else {
		// get all sources
		Source.find(function (err, sources) {
			if (err) {
				res.status(422);
				res.json({ "error": err });
			}
			return res.json({ data: sources });
		}).populate('category').populate('user');
	}
};

/**
 * Delete one source
 *
 * @param {*} req
 * @param {*} res
 */
const sourceDelete = async (req, res) => {
	try {
		if (req.query && req.query.id) {
			const source = await Source.findById(req.query.id);

			if (source) {
				const resultRemoveNews = await removeNewsBySource(source);
				if (resultRemoveNews) {
					await source.remove();
					return res.status(204).json({});
				} else {
					return res.status(500).json({ msg: "Error interno del servidor" })
				}
			} else {
				return res.status(404).json({ msg: "Source no encontrado" })
			}


		} else {
			return res.status(404).json({ msg: "Source no encontrado" });
		}
	} catch (error) {
		console.log(error)
		return res.status(500).json({ msg: error });
	}
};

/**
 * Updates a source
 *
 * @param {*} req
 * @param {*} res
 */
const sourcePatch = async (req, res) => {
	try {
		const category = await Category.findById(req.body.category_id);

		if (!category) {
			return res.status(409).json({ msg: 'Categoria no valida' });
		}

		const user = await User.findById(req.body.user_id);

		if (!user) {
			return res.status(409).json({ msg: 'Usuario no valida' });
		}

		const source = await Source.findById(req.query.id);

		if (!source) {
			return res.status(404).json({ msg: 'Source no encontrado' });
		}
		const oldUrl = source.url;
		source.url = req.body.url;
		source.name = req.body.name;
		source.category = category;
		source.user = user

		const sourceSaved = await source.save();

		if (oldUrl !== req.body.url) {
			let feed = await parser.parseURL(sourceSaved.url);
			const resultSaveNews = await processAndSaveNews(feed.items, sourceSaved, user, category);
			if (!resultSaveNews) {
				return res.status(500).json({ msg: 'Error al guardar las noticias' });
			}
		}

		return res.status(200).json({ msg: 'Created', data: sourceSaved });
	} catch (error) {
		console.log(error)
		return res.status(500).json({ msg: error });
	}
};

module.exports = {
	sourceGet,
	sourcePost,
	sourcePatch,
	sourceDelete,
}
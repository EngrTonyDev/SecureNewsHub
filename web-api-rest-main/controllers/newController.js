const Notice = require("../models/newsModel");

const User = require("../models/usersModel");
const Category = require("../models/categoriesModel");
const Source = require("../models/sourcesModel");
const { saveTags } = require('./tagController');

/**
 * Creates a Notice
 *
 * @param {*} req
 * @param {*} res
 */
const noticePost = async (req, res) => {
	var notice = new Notice();

	const user = await User.findById(req.body.id_user);
	const category = await Category.findById(req.body.id_category);
	const source = await Source.findById(req.body.id_sources);

	notice.title = req.body.title;
	notice.description = req.body.description;
	notice.permalink = req.body.link;

	notice.user = user;
	notice.category = category;
	notice.source = source;

	//console.log(notice.category);

	if (notice.title && notice.description && notice.permalink
		&& Object.keys(notice.user).length > 0
		&& Object.keys(notice.category).length > 0
		&& Object.keys(notice.source).length > 0
	) {
		notice.save(function (err) {

			if (err) {
				res.status(422);
				console.log('Error while saving the notice', err)
				res.json({
					error: 'There was an error saving the notice'
				});
			}
			res.status(201);//CREATED
			res.header({
				'location': `http://localhost:3000/api/notices/?id=${notice.id}`
			});
			res.json(notice);
		});
	} else {
		res.status(422);
		console.log('Error while saving the notice')
		res.json({
			error: 'No valid data provided for notice'
		});
	}
};

/**
 * Get all notices
 *
 * @param {*} req
 * @param {*} res
 */
const noticeGet = (req, res) => {
	// if an specific notice is required
	if (req.query && req.query.id) {
		Notice.findById(req.query.id, function (err, notice) {
			if (err) {
				res.status(404);
				console.log('Error while queryting the notice', err)
				res.json({ error: "Notice doesnt exist" })
			}
			res.json(notice);
		});
	} else {
		// get all notices
		Notice.find(function (err, notices) {
			if (err) {
				res.status(422);
				res.json({ "error": err });
			}
			res.json(notices);
		}).populate('tags');

	}
};


//id user
const getNoticeByIdUser = (req, res) => {
	// if an specific notice is required
	if (req.params && req.params.id) {
		Notice.find({ 'user._id': req.params.id }, function (err, notice) {
			if (err) {
				res.status(404);
				console.log('Error while queryting the notice', err)
				res.json({ error: "Notice doesnt exist" })
			}
			res.json(notice);
		});
	} else {
		// get all notices
		Notice.find(function (err, notices) {
			if (err) {
				res.status(422);
				res.json({ "error": err });
			}
			res.json(notices);
		});

	}
};

//id user
const getNoticeByIdCategory = (req, res) => {
	// if an specific notice is required
	if (req.params && req.params.id) {
		Notice.find({ 'category._id': req.params.id }, function (err, notice) {
			if (err) {
				res.status(404);
				console.log('Error while queryting the notice', err)
				res.json({ error: "Notice doesnt exist" })
			}
			res.json(notice);
		});
	} else {
		// get all notices
		Notice.find(function (err, notices) {
			if (err) {
				res.status(422);
				res.json({ "error": err });
			}
			res.json(notices);
		});

	}
};

/**
 * Delete one notice
 *
 * @param {*} req
 * @param {*} res
 */
const noticeDelete = (req, res) => {
	// if an specific notice is required
	if (req.query && req.query.id) {
		Notice.findById(req.query.id, function (err, notice) {
			if (err) {
				res.status(500);
				console.log('Error while queryting the notice', err)
				res.json({ error: "Notice doesnt exist" })
			}
			//if the notice exists
			if (notice) {
				notice.remove(function (err) {
					if (err) {
						res.status(500).json({ message: "There was an error deleting the notice" });
					}
					res.status(204).json({});
				})
			} else {
				res.status(404);
				console.log('Error while queryting the notice', err)
				res.json({ error: "Notice doesnt exist" })
			}
		});
	} else {
		res.status(404).json({ error: "You must provide a notice id" });
	}
};

/**
 * Updates a notice
 *
 * @param {*} req
 * @param {*} res
 */
const noticePatch = (req, res) => {
	// get notice by id
	if (req.query && req.query.id) {
		Notice.findById(req.query.id, function (err, notice) {
			if (err) {
				res.status(404);
				console.log('Error while queryting the notice', err)
				res.json({ error: "Notice doesnt exist" })
			}

			// update the notice object (patch)
			notice.title = req.body.title ? req.body.title : notice.title;
			notice.description = req.body.description ? req.body.description : notice.description;
			//notice.user_id = req.body.user_id ? req.body.user_id : notice.user_id;
			//notice.category_id = req.body.category_id ? req.body.category_id : notice.category_id;

			notice.save(function (err) {
				if (err) {
					res.status(422);
					console.log('Error while saving the notice', err)
					res.json({
						error: 'There was an error saving the notice'
					});
				}
				res.status(200); // OK
				res.json(notice);
			});
		});
	} else {
		res.status(404);
		res.json({ error: "Notice doesnt exist" })
	}
};

const removeNewsBySource = async (source) => {
	try {
		const news = await Notice.find({ source: source._id });
		for (let item of news) {
			try {
				await item.remove();
			} catch (err) {
				console.log(err)
				return false;
			}
		}
		return true;
	} catch (error) {
		console.log(error)
		return false;
	}
}

const processAndSaveNews = async (items, source, user, category) => {
	try {
		for (let item of items) {
			try {
				const resultTags = await saveTags(item.categories || []);
				const newItem = new Notice({
					title: item.title,
					description: item.contentSnippet ? item.contentSnippet.substring(0, 200) : '',
					permalink: item.link,
					date: item.pubDate,
					source: source,
					user,
					category,
					tags: resultTags
				});
				await newItem.save();
			} catch (err) {
				console.log(err)
				return false;
			}
		}
		return true;
	} catch (error) {
		console.log(error)
		return false;
	}
}

module.exports = {
	noticeGet,
	noticePost,
	noticePatch,
	noticeDelete,
	getNoticeByIdUser,
	getNoticeByIdCategory,
	processAndSaveNews,
	removeNewsBySource
}
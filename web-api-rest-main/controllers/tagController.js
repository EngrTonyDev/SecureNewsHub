const Tag = require('../models/tagsModel');


const tagsGet = async (req, res) => {
    try {
        const result = await Tag.find();
        return res.json({ data: result });
    } catch (error) {
        console.log(error)
		return res.status(500).json({ msg: error });
    }
  };

const saveTags = async (tags) => {
    try {
        const tagMapped = tags.map(tag => ({ name: tag }));

        const tagsDB = await Tag.find();

        const tagsToAssign = [];

        const tagsToInsert = tagMapped.filter(tag => {
            const index = tagsDB.findIndex(tagDB => tagDB.name === tag.name);
            if (index === -1) {
                return tag;
            }
            tagsToAssign.push(tagsDB[index]);
            return null;
        });
        const tagsInserted = await Tag.insertMany(tagsToInsert);

        return [...tagsToAssign, ...tagsInserted];
    } catch (error) {
        return false;
    }
}

module.exports = {
    saveTags,
    tagsGet
}
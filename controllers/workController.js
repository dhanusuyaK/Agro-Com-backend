// controllers/workController.js
const Work = require('../models/Work');

const createWork = async (req, res) => {
  const { workName, contactNumber, location, salary, username } = req.body;
  try {
    const work = await Work.create({ workName, contactNumber, location, salary, username });
    res.status(201).json(work);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getWorks = async (req, res) => {
  try {
    const works = await Work.find({});
    res.json(works);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createWork, getWorks };

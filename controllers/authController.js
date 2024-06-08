// controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerUser = async (req, res) => {
  const { fullname,username, email, password, category } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await User.create({ fullname,username, email, password, category });
    if (user) {
      res.status(201).json({
        _id: user._id,
        fullname:user.fullname,
        username: user.username,
        email: user.email,
        category: user.category,
        token: generateToken(user._id, user.username),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        fullname:user.fullname,
        username: user.username,
        email: user.email,
        category: user.category,
        followers:user.followers,
        following:user.following,
        credits:user.credits,
        profilePhoto:user.profilePhoto,
        token: generateToken(user._id, user.username),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      _id: user._id,
        fullname:user.fullname,
        username: user.username,
        email: user.email,
        category: user.category,
        followers:user.followers,
        following:user.following,
        credits:user.credits,
        profilePhoto:user.profilePhoto,
        token: generateToken(user._id, user.username),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getUserById };

module.exports = { registerUser, authUser, getUserById };

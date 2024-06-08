// routes/authRoutes.js
const express = require('express');
const { registerUser, authUser,getUserById } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', authUser);
router.get('/:id', protect,getUserById);

module.exports = router;

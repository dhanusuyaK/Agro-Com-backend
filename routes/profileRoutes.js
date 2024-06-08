const express = require('express');
const { updateUserProfile, updateUserProfilePhoto } = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.put('/edit/:id', protect, updateUserProfile);
router.put('/photo/:id', protect, updateUserProfilePhoto);

module.exports = router;
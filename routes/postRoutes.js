// routes/postRoutes.js
const express = require('express');
const { createPost, validatePost, getPosts,getPostsByUsername } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create/:username', protect, createPost);
router.put('/validate', protect, validatePost);
router.get('/allposts', getPosts);
router.get('/userposts/:username', protect,getPostsByUsername);

module.exports = router;

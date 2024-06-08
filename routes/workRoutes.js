// routes/workRoutes.js
const express = require('express');
const { createWork, getWorks } = require('../controllers/workController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', protect, createWork);
router.get('/', getWorks);

module.exports = router;

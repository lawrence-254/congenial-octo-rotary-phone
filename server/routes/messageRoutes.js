const express = require('express');
const protect = require('../middlewares/authMiddleware');
const router = express.Router();

// router.route('/').get(protect, getMessages);
router.route('/:chatId').get(protect, getChatMessages);

router.route('/').post(protect, sendMessage);

module.exports = router;
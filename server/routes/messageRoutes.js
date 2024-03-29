const express = require('express');
const protect = require('../middlewares/authMiddleware');
const { sendMessage, getAllChatMessages } = require('../controllers/messageController');
const router = express.Router();

// router.route('/').get(protect, getMessages);
router.route('/:chatId').get(protect, getAllChatMessages);

router.route('/').post(protect, sendMessage);

module.exports = router;
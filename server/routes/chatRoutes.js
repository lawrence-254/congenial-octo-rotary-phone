const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const protect = require('../middlewares/authMiddleware');
const { getChats, getMyChats, createGroupChat, addToChat, renameGroupChat, deleteGroupChat } = require('../controllers/chatController');

router.route('/').post(protect, chatController.getChats);
router.route('/').get(protect, chatController.getMyChats);
router.route('/groupAdd').post(protect, chatController.addToChat);
router.route('/group').post(protect, chatController.createGroupChat);
router.route('/rename').put(protect, chatController.renameGroupChat);
router.route('/groupDelete').delete(protect, chatController.deleteGroupChat);

module.exports = router;
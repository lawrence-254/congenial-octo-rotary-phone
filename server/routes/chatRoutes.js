const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const protect = require('../middlewares/authMiddleware');
const { getChats, getMyChats, createGroupChat, addToChat, removeFromChat, renameGroupChat, deleteChat } = require('../controllers/chatController');

router.route('/').post(protect, chatController.getChats);
router.route('/').get(protect, chatController.getMyChats);
router.route('/groupAdd').put(protect, chatController.addToChat);
router.route('/groupRemove').put(protect, chatController.removeFromChat);
router.route('/group').post(protect, chatController.createGroupChat);
router.route('/rename').put(protect, chatController.renameGroupChat);
router.route('/chatDelete').delete(protect, chatController.deleteChat);

module.exports = router;
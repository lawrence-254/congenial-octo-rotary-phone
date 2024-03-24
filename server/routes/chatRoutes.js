const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const protect = require('../middlewares/authMiddleware');

router.route('/').get(protect, chatController.getChats);
router.route('/').post(protect, chatController.getMyChats);
router.route('/add').post(protect, chatController.addToChat);
router.route('/group').post(protect, chatController.createGroupChat);
router.route('/rename').put(protect, chatController.renameGroupChat);
router.route('/groupDelete').delete(protect, chatController.deleteGroupChat);

module.exports = router;
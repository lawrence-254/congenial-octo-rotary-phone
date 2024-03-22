const express = require('express');
const { registerUser, authUser } = require('../controllers/userController');

const router = express.Router();

router.route('/').post(registerUser);
router.route('/login', authUser);
// router.route('/login').get((req, res) => {}).post((req, res) => {});

module.exports = router;
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../configs/generateToken');

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, picture } = req.body;
    const userExists = await User.findOne({
        email
    });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    const user = await User.create({
        name,
        email,
        password,
        picture
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (user && (await user.matchPassword(password))) {
        const token = generateToken(user._id);
        // If email and password match, generate a JWT token and send user data along with token in response
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            token: token,
        });
    } else {
        // If email or password is incorrect, send a 401 Unauthorized status and throw an error
        res.status(401).json({ message: 'Invalid email or password' });
    }
});

const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: 'i' } },
            { email: { $regex: req.query.search, $options: 'i' } },
        ]
    } : {};
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);

    console.log(keyword);
});


module.exports = { registerUser, authUser, allUsers };
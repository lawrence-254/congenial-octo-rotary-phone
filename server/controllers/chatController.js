const asyncHandler = require('express-async-handler');
const Chat = require('../models/chatModel');
const User = require('../models/userModel');

const getChats = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        res.status(400);
        throw new Error('User ID is required');
    }
    try {
        var singleChats = await Chat.find({
            chatTypeGroup: false,
            $and: [
                { chatParticipants: { $elemMatch: { $eq: userId } } },
                { chatParticipants: { $elemMatch: { $eq: req.user._id } } }
            ]
        }).populate('chatParticipants', '-password').populate('latestMessage');

        singleChats = await User.populate(singleChats, {
            path: 'latestMessage.sender',
            select: '-password'
        });
        if (singleChats.length > 0) {
            res.send(singleChats[0]);
        } else {
            var chatDetails = {
                chatTitle: 'sender',
                chatTypeGroup: false,
                chatParticipants: [userId, req.user._id],
                latestMessage: null
            };
            try {
                const newChat = await Chat.create(chatDetails);

                const FullChat = await Chat.findOne({ _id: newChat._id }).populate('chatParticipants', '-password').populate('latestMessage');

                res.status(201).send(FullChat);
            } catch (error) {
                console.error('Error creating chat:', error);
                res.status(500).json({ message: 'Failed to create chat.' });
            }
        }
        // const chats = await Chat.find({ users: req.user._id }).populate('users', 'name');
        // res.json(chats);
    } catch (error) {
        // Handle any errors that might occur during the database query or population
        console.error('Error fetching chats:', error);
        res.status(500).json({ message: 'Failed to fetch chats.' });
    }
});


const getMyChats = asyncHandler(async (req, res) => {
    try {
        Chat.find({ chatParticipants: { $elemMatch: { $eq: req.user._id } } })
            .populate("chatParticipants", "-password").populate("groupAdmin", "-password")
            .populate("latestMessage")
            .populate("latestMessage.sender", "-password").sort({ updatedAt: -1 }).exec().then(async (result) => {
                result = await User.populate(result, {
                    path: 'latestMessage.sender',
                    select: '-password'
                });
                res.status(200).send(result);
            });
    }
    catch (error) { }
});


const createGroupChat = asyncHandler(async (req, res) => {
    const { chatTitle, chatParticipants } = req.body;
    if (!chatTitle || !chatParticipants) {
        res.status(400);
        throw new Error('Chat title and participants are required');
    }
    if (chatParticipants.length < 2) {
        res.status(400);
        throw new Error('Group chat must have at least two participants');
    };
    try {
        const chatDetails = {
            chatTitle: req.body.chatTitle,
            chatTypeGroup: true,
            chatParticipants: req.body.chatParticipants,
            groupAdmin: req.user._id,
            latestMessage: null
        };
        const newCreatedChat = await Chat.create(chatDetails);
        const fullDbChat = await Chat.findOne({ _id: newCreatedChat._id }).populate('chatParticipants', '-password').populate('latestMessage');
        res.status(201).json(fullDbChat);
    } catch (error) {
        console.error('Error creating chat:', error);
        res.status(500).json({ message: 'Failed to create chat.' });
    }
});

const renameGroupChat = asyncHandler(async (req, res) => {
    const { chatId, chatTitle } = req.body;
    if (!chatId || !chatTitle) {
        res.status(400);
        throw new Error('Chat ID and title are required');
    }
    try {
        const updatedChat = await Chat.findByIdAndUpdate(chatId, { chatTitle: chatTitle }, { new: true }).populate('chatParticipants', '-password').populate('latestMessage');
        res.status(200).json(updatedChat);
    } catch (error) {
        console.error('Error renaming chat:', error);
        res.status(500).json({ message: 'Failed to rename chat.' });
    }
});

const deleteChat = asyncHandler(async (req, res) => {
    const { chatId } = req.body;
    if (!chatId) {
        res.status(400);
        throw new Error('Chat ID is required');
    }
    try {
        await Chat.findByIdAndDelete(chatId);
        res.status(200).json({ message: 'Chat deleted' });
    } catch (error) {
        console.error('Error deleting chat:', error);
        res.status(500).json({ message: 'Failed to delete chat.' });
    }
});

const addToChat = asyncHandler(async (req, res) => {
    const { chatId, chatParticipants } = req.body;
    if (!chatId || !chatParticipants) {
        res.status(400);
        throw new Error('Chat ID and participants are required');
    }
    try {
        const updatedChat = await Chat.findByIdAndUpdate(chatId, { $push: { chatParticipants: chatParticipants } }, { new: true }).populate('chatParticipants', '-password').populate('latestMessage');
        res.status(200).json(updatedChat);
    } catch (error) {
        console.error('Error adding to chat:', error);
        res.status(500).json({ message: 'Failed to add to chat.' });
    }
});

const removeFromChat = asyncHandler(async (req, res) => {
    const { chatId, chatParticipants } = req.body;
    if (!chatId || !chatParticipants) {
        res.status(400);
        throw new Error('Chat ID and participants are required');
    }
    try {
        const updatedChat = await Chat.findByIdAndUpdate(chatId, { $pull: { chatParticipants: chatParticipants } }, { new: true }).populate('chatParticipants', '-password').populate('latestMessage');
        res.status(200).json(updatedChat);
    } catch (error) {
        console.error('Error removing from chat:', error);
        res.status(500).json({ message: 'Failed to remove from chat.' });
    }
});

module.exports = { getChats, getMyChats, createGroupChat, addToChat, renameGroupChat, deleteChat, removeFromChat };
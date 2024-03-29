const asyncHandler = require('express-async-handler');
const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");


const sendMessage = asyncHandler(async (req, res) => {
    const { chatId, content } = req.body;

    if (!chatId || !content) {
        res.status(400);
        throw new Error("Chat ID and message are required");
        console.log("Chat ID and message are required");
    }

    var newMessage = {
        chat: chatId,
        sender: req.user._id,
        content: content
    };

    try {
        var message = await Message.create(newMessage);

        message = await message.populate("sender", "name email picture");
        message = await message.populate("chat");
        message = await User.populate(message, { path: "chat.users", select: "name email picture" });

        await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message })
        res.status(201).json(message);
    }
    catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

const getAllChatMessages = asyncHandler(async (req, res) => {
    try {
        const message = await Message.find({ chat: req.params.chatId }).populate("sender", "name email picture").sort({ createdAt: -1 }).populate("chat");
        res.status(200).json(message);
    }
    catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
}
);
module.exports = { sendMessage, getAllChatMessages };
const expressAsyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");


const sendMessage = expressAsyncHandler(async (req, res) => {
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

    try { }
    catch (error) {
        res.status(500);
        throw new Error("Error sending message");
    }
});

module.exports = { sendMessage };
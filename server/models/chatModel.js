const mongoose = require('mongoose');

// Define the schema for the chat model
const chatSchema = new mongoose.Schema(
    {
        chatTitle: { type: String, trim: true },
        chatTypeGroup: { type: Boolean, default: false },
        chatParticipants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        },
        groupAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);

// Create a model based on the schema
const Chat = mongoose.model('Chat', chatSchema);

// Export the model
module.exports = Chat;

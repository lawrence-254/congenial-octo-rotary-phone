const mongoose = require('mongoose');

// Define the schema for the user model
const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        picture: { type: String, required: true, default: "../static/default.jpeg" }
    },
    {
        timestamps: true
    }
);

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;

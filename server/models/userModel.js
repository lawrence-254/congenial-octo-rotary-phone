const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema for the user model
const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        picture: { type: String, required: false, default: "../static/default.jpeg" }
    },
    {
        timestamps: true
    }
);

// Method to compare entered password with stored password hash
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Pre-save hook to hash the password before saving the user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;



// const mongoose = require('mongoose');

// // Define the schema for the user model
// const userSchema = mongoose.Schema(
//     {
//         name: { type: String, required: true },
//         email: { type: String, required: true, unique: true },
//         password: { type: String, required: true },
//         picture: { type: String, required: false, default: "../static/default.jpeg" }
//     },
//     {
//         timestamps: true
//     }
// );
// userSchema.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };
// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//         next();
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
// });


// // Create a model based on the schema
// const User = mongoose.model('User', userSchema);

// // Export the model
// module.exports = User;

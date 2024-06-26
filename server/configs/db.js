const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        console.log('MongoDB URI:', process.env.MONGO_DB_URI);
        const connection = await mongoose.connect(process.env.MONGO_DB_URI);
        console.log(`Connected to MongoDB ${connection.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
}

module.exports = dbConnection;


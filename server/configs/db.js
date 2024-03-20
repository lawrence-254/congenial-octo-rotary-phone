const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_DB_URI, {
            // Remove useNewUrlParser and useUnifiedTopology
            // These options are deprecated and have no effect
        });
        console.log(`Connected to MongoDB ${connection.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1); // Exit with a non-zero status code to indicate failure
    }
}

module.exports = dbConnection;


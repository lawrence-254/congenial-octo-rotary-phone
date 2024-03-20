const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connected to MongoDB' ${conn.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit();
    }
}

module.exports = dbConnection;

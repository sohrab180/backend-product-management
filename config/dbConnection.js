const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        console.log('Connecting database...');
         // Set strictQuery to true (or false based on your requirement)
         mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.CONNECTION_STRING, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // serverSelectionTimeoutMS: 100000, // Increase timeout
        });
        console.log('Database connected successfully.');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;

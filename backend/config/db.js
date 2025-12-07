import mongoose from "mongoose";

// require('dotenv').config();

const connectDB = async () => {
    try {
        // Mongoose 6+ no longer requires the useUnifiedTopology and useNewUrlParser options
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected successfully!');
    } catch (err) {
        console.error(`MongoDB Connection Error: ${err.message}`);
        // Exit process with failure
        process.exit(1);
    }
};

export default connectDB;
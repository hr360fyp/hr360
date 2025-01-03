import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    console.log("MongoDB URI:", process.env.MONGO_URL);

    mongoose.set('strictQuery', false); // Suppress strictQuery warning

    const startTime = Date.now(); // Start time
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    const endTime = Date.now(); // End time

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Connection time: ${(endTime - startTime)} ms`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDatabase;

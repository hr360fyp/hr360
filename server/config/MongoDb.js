import mongoose from "mongoose";

let cachedConnection = null;

const connectDatabase = async () => {
  console.log("connectDatabase called");
  if (cachedConnection) {
    console.log("Using cached MongoDB connection.");
    return cachedConnection;
  }
  console.log("connectDatabase called 2");
  try {
    console.log("MongoDB URI:", process.env.MONGO_URL);
    console.log("connectDatabase called 3");
    mongoose.set('strictQuery', false);
    console.log("connectDatabase called 4");
    const startTime = Date.now();
    console.log("connectDatabase called 5");
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      serverSelectionTimeoutMS: 5000, // Reduce server selection timeout
    });
    console.log("connectDatabase called 6");
    const endTime = Date.now();
    console.log("connectDatabase called 7");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Connection time: ${(endTime - startTime)} ms`);

    cachedConnection = conn;
    return conn;
  } catch (error) {
    console.log("connectDatabase called 8");
    console.error(`MongoDB connection error: ${error.message}`);
    throw error;
  }
};

export default connectDatabase;

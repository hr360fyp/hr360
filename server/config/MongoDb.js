import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    console.log("MongoDB URI:", process.env.MONGO_URL);  

    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);  
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`); 
    process.exit(1);  
  }
};

export default connectDatabase;

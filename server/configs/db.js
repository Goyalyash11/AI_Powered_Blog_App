import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Database Conection Error:", error.message);
  }
};

export default connectDB;

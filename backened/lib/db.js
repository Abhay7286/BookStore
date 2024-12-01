import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongoose connection sucessful: ${conn.connection.host}`);
  } catch (error) {
    console.log("error connecting to monogodb",error.message);
    process.exit(1);
  }
}

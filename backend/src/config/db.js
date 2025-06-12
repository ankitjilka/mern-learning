import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

      console.log("MONGODB CONNECTED...")
    } catch (error){
        console.log("error while connecting mongo::", error);
        process.exit(1)
    }
   
}
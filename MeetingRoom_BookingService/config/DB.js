import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const ConnectDb= async ()=>{

    mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");
    
}

export default ConnectDb
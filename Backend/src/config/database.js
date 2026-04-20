import mongoose from "mongoose";

async function connectToDB() {
   await mongoose.connect(process.env.MONGO_URI)
    console.log("the server is connected to the database");
    
    
}
export default connectToDB
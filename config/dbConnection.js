require('dotenv').config();
const mongoose = require("mongoose")
const connectDB= async ()=>{
    try{
        const connect=await mongoose.connect(process.env.MONGO_URL)
        console.log("Mongo connected: ",connect.connection.name)
    }
    catch(err){
        console.log(err)
        process.exit(1);
    }
}

module.exports=connectDB;
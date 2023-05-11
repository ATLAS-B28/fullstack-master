import mongoose from "mongoose";
export default async ()=>{
    return mongoose.connect(process.env.MONGO_DB,{
        useNewUrlParser:true,
        autoIndex:false,
        maxPoolSize:45,
        serverSelectionTimeoutMS:5000,
        socketTimeoutMS:45000,
        family:4
    })
}
import mongoose from "mongoose";
const PubSchema = mongoose.Schema({
    id:Number,
    name:String,
    books:[String]
})
export default mongoose.model("publications",PubSchema)
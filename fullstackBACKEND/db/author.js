import mongoose from "mongoose";
const AuthorSchema = mongoose.Schema({
    id:Number,
    name:String,
    books:[String]
})
export default mongoose.model("authors",AuthorSchema)
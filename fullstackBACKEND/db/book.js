import mongoose from "mongoose";
const BookSchema = mongoose.Schema(
    {
        ISBN:String,
        title:String,
        pubDate:String,
        language:String,
        numPage:Number,
        author:[Number],
        publications:[Number],
        category:[String]
    }
)
export default mongoose.model("books",BookSchema)
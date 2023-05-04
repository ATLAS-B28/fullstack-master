import mongoose from 'mongoose'
const ReviewSchema = new mongoose.Schema({
   food:{
    type:mongoose.Types.ObjectId,
    ref:"Foods"
   },
   restaurant:{
    type:mongoose.Types.ObjectId,
    ref:"Restaurants"
   },
   user:{
    type:mongoose.Types.ObjectId//used to refer the other schema's id to get their data and refer here
   },
   rating:{
    type:Number,
    required:true
   },
   reviewText:{
    type:String,
    required:true
   },
   isRestaurantReview:Boolean,
   isFoodReview:Boolean,
   photos:[{
    type:mongoose.Types.ObjectId,
    ref:"Images"
   }]
},
{
    timestamps:true
})
export const ReviewModel =  mongoose.model("Review",ReviewSchema)
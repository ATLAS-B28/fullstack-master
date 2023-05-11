import express from 'express'
import { ReviewModel } from '../../database/allModels.js'
const router = express.Router()
//post and delete
//post - /new and body of the req sent with review
router.post("/new",async (req,res)=>{
    try {
        //get the data 
        const {reviewData} = req.body
        //create the review on backend
        await ReviewModel.create(reviewData)
        return res.json({message:"Review given"})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})
//delete - /delete and do it by id
router.delete("/delete/:_id",async (req,res)=>{
    try {
        //get the id from param
        const {_id} = req.params
        //find and delete the review on backend
        await ReviewModel.findByIdAndDelete(_id)
        return res.json({message:"Review deleted"})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})
export default router
//orders and processing is done here 
import express from 'express'
import passport from 'passport'
import { OrderModel } from '../../database/allModels.js'
const router = express.Router()
//get orders based on id of user
// /:_id of user 
//get desc of order
//get method
router.get("/:_id",passport.authenticate("jwt",{session:false})
,
async (req,res)=>{
    try {
        //get the id from the req body
        //and  find in DB
        //if not order found display eror message
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}
)
//post order by id of user
//desc - new order
//post method
router.post("/new/:_id",async (req,res)=>{
    try {
        //id from req body
        //body order details from req body
        //add the new order to database
        return res.json({message:"Order made"})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})
export default router
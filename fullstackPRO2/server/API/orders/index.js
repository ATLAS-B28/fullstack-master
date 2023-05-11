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
        const {_id} = req.params
        //and  find in DB
        const getOrders = await OrderModel.findOne({user:_id})
        //if not order found display eror message
        if(!getOrders)
          return res.status(404).json({error:"user not found"})
        
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
        const {_id} = req.params
        //body order details from req body
        const {orderDetails} = req.body //the req body of the order detail
        //add the new order to database
        const addNewOrder = await OrderModel.findOneAndUpdate(
            {
                user:_id
            },
            {
                $push:{orderDetails:orderDetails}
            },
            {
                new:true
            }
        )
        return res.json({order:addNewOrder})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})
export default router
import express from 'express'
import { UserModel } from '../../database/allModels.js'
const router = express.Router()
//get user by _id
router.get("/:_id",async (req,res)=>{
    try {
        //_id is the param
        const {_id} = req.params
        //find the user in DB
        const getUser = await UserModel.findById(_id)
        return res.json({user:getUser})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})
//update by _id and has req.body
router.put("/update/:_userId",async (req,res)=>{
    try {
        //get userId by req.params
        const {userId} = req.params
        //user body from req
        const {userData} = req.body
        //update using regex
        const updateUserData = await UserModel.findByIdAndUpdate(
            userId,
            {
             $set:userData
            },
            {
                new:true
            }
        )
        return res.json({user:updateUserData})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})
export default router
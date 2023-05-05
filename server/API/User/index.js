import express from 'express'
import { UserModel } from '../../database/allModels.js'
const router = express.Router()
//get user by _id
router.get("/:_id",async (req,res)=>{
    try {
        //_id is the param
        //find the user in DB
        return res.json({message:"User found by id"})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})
//update by _id and has req.body
router.put("/update/:_userId",async (req,res)=>{
    try {
        //get userId by req.params
        //user body from req
        //update using regex
        return res.json({message:"Updated the user by id"})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})
export default router
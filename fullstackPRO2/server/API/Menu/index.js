//here we have 2 things images and menus 
import express from 'express'
import { MenuModel,ImageModel } from '../../database/allModels.js'
const router = express.Router()
//get the list and images
//params - id of item in menu
//  /list/:_id
router.get("/list/:_id",async (req,res)=>{
    try {
        //get the id from params
        //menu data from DB
        return res.json({message:"Menu list"})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})
//params - id of item in menu
// /image/:_id
router.get("/image/:_id",async (req,res)=>{
    try {
        //get id from params
        //menu images from DB
        return res.json({message:"Menu Images"})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})
export default router
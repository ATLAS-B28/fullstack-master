//here we have 2 things images and menus 
import express from 'express'
import { MenuModel,ImageModel } from '../../database/allModels.js'
const router = express.Router()
//get the list and images
//params - id of item in menu
//  /list/:_id
//menus of the food with that id we refernced in the menu model
router.get("/list/:_id",async (req,res)=>{
    try {
        //get the id from params
        const {_id} = req.params
        //menu data from DB
        const menus = await MenuModel.findOne(_id)//_id from params
        return res.json({menus})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})
//params - id of item in menu
// /image/:_id
router.get("/image/:_id",async (req,res)=>{
    try {
        //get id from params
        const {_id} = req.params
        //menu images from DB
        const menus = await ImageModel.findOne(_id)
        return res.json({menus})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})
export default router
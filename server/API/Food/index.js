import express  from "express";
import { FoodModel } from "../../database/allModels.js";
const router = express.Router()
//here we have to have routes to-
/**
 * to get all food of a particular restaurant by id
 * to get restaurant by category
 */
//first is all food of a restaurant with route
// /:_id
//params - contains id of restaurant
router.get("/:_id", async (req,res)=>{
    try {
        ///validate the id
        //id 
        //find it in the DB
        return res.json({message:"resulting food by restaurant"})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}) 
// 2nd is all food by category 
// /r/:category
// params - category
router.get("/r/:category",async (req,res)=>{
    try {
        //validate the categories
        //category
        //find in the DB with regex 
        return res.json({message:"resulting food by restaurant"})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})

export default router
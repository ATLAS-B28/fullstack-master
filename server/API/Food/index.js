import express  from "express";
import { FoodModel } from "../../database/allModels.js";
import { ValidateCategory, ValidateRestaurantId } from "../../validation/food.js";
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
        await ValidateRestaurantId(req.params)//the params has the id
        //id 
        const {_id}  = req.params
        //find it in the DB
        const food = await FoodModel.find({restaurant:_id})
        return res.json({food})
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
        await ValidateCategory(req.params)
        //category
        const {category} = req.params
        //find in the DB with regex 
        const foods = await FoodModel.find({
            category:{
                $regex:category,$options:"i"
            }
        })
        return res.json({foods})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})

export default router
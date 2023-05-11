import express from 'express'
import { RestaurantModel } from '../../database/allModels.js'
import { ValidateResSearchString, ValidateRestaurantCity } from '../../validation/restaurant.js'
import { ValidateRestaurantId } from '../../validation/food.js'
const router = express.Router()
// get the restaurant and with id 
//also have search 
// route / and param - none ,get all restaurant
router.get("/", async (req,res)=>{
    try {
        //validate the querying of restaurants
        await ValidateRestaurantCity(req.query)
        //the query is of the city 
        const {city} = req.query //this gives the city and the restaurant in it
        //req.query is an object that contains values after the question mark
        //find the DB
        const restaurant = await RestaurantModel.find({city})
        return res.json({restaurant})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})
//route - /:_id ,get particular restaurant details by id
router.get(":_id", async (req,res)=>{
    try {
        //validate
        await ValidateRestaurantId(req.params)
        //get the id from param of req
        const {_id} = req.params//here the param is :_id
                              //i.e. like /23 
        //find by id
        const restaurant = await RestaurantModel.findOne({_id})
        //if not found show a error message
        if(!restaurant) 
          return res.status(404).json({error:"Restaurant not found"})
        return res.json({restaurant})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})
//serach with req.body and route - /search
//the body will be of the string and method get is used
router.get("/search",async (req,res)=>{
    try {
       //validate the search string
       await ValidateResSearchString(req.body)
       //get the body
       const {searchString} = req.body
       //find it in DB nad we use regex
       const restaurant = await RestaurantModel.find({
        name:{$regex:searchString,$options:"i"}
        /**regex interprets the query field as a 
         * regular expression. regex is a 
         * term-level operator, meaning that
         *  the query field isn't analyzed. */
       }) 
       return res.json({restaurant})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})
export default router
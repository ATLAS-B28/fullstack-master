import express from 'express'
import { RestaurantModel } from '../../database/allModels.js'
const router = express.Router()
// get the restaurant and with id 
//also have search 
// route / and param - none ,get all restaurant
router.get("/", async (req,res)=>{
    try {
        //validate the querying of restaurants
        //the query is of the city 
        //find the DB
        return res.json({message:"Restaurant list"})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})
//route - /:_id ,get particular restaurant details by id
router.get(":_id", async (req,res)=>{
    try {
        //get the id from param of req
        //find by id
        //if not found show a error message
        return res.json({message:"Restaurant by id"})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})
//serach with req.body and route - /search
//the body will be of the string and method get is used
router.get("/search",async (req,res)=>{
    try {
       //validate the search string
       //get the body
       //find it in DB nad we use regex 
       return res.json({message:"Search query food"})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})
export default router
import mongoose, { mongo } from "mongoose";

const MenuSchema = new mongoose.Schema({
    menus:[
        {
            name:{
                type:String,
                required:true
            },
            items:[
                {
                type:mongoose.Types.ObjectId,
                ref:"Foods"
            }
        ]
    }
 ],
 recommended:[
    {
        type:mongoose.Types.ObjectId,
        ref:"Foods",//refers to id of food items for every menu searched by id
        unique:true
    }
 ]
},
{
    timestamps:true
})
export const MenuModel =  mongoose.model("Menus",MenuSchema)
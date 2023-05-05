import express  from "express";
import AWS from 'aws-sdk';
import multer from "multer";
import { ImageModel } from "../../database/allModels.js";
const router = express.Router()
//multer config
const storage  = multer.memoryStorage();
/**Returns a StorageEngine implementation 
 * configured to store files in memory as
 *  Buffer objects 
*/
const upload  = multer({storage})
/**
 * Returns a Multer instance that provides
 * several methods for generating middleware
 * that process files uploaded in multipart/form-data 
 * format.
*/
//it is a post route to s3 bucket to upload images via multer
router.post("/",upload.single("file")
/**Returns 
   middleware that processes a single
   file associated with the given 
   form field. 
*/,
async (req,res)=>{
    try {
        //get the file from the req header
        //then get the aws s3 options to pass for uploading
        //finally upload with bucket options
        return res.status(200).json({message:"Uploaded"})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}
)
export default router
import express  from "express";
import AWS from 'aws-sdk';
import multer from "multer";
import { ImageModel } from "../../database/allModels.js";
import { s3Upload } from "../../Utils/S3.js";
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
        const file = req.file
        //then get the aws s3 options to pass for uploading
        const bucketOptions = {
            Bucket:"",
            Key:file.originalname,
            Body:file.buffer,
            ContentType:file.mimetype,
            ACL:"public-read"
        }
        //finally upload with bucket options
        const uploadImage = await s3Upload(bucketOptions)
        return res.status(200).json({uploadImage})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}
)
export default router
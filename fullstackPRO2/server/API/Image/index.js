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
            Bucket:"fullstackprobucket",
            Key: file.originalname,
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
/*import express from "express";
import AWS from "aws-sdk";
import multer from "multer";

//Database model
import { ImageModel } from "../../database/allModels.js";

//Utilities
import { s3Upload } from "../../Utils/S3.js";

const Router = express.Router();

//Multer config
const storage = multer.memoryStorage();
const upload = multer({storage});

/*
Route            /
Des              Uploading given image to S3 bucket , and then saving the file to mongodb
Params           None
Access           Public
Method           POST


Router.post("/", upload.single("file") ,async(req,res)=> {
  try {
 const file = req.file;

 //S3 bucket options
 const bucketOptions = {
   Bucket: "fullstackprobucket",
   Key: file.originalname,
   Body: file.buffer,
   ContentType: file.mimetype,
   ACL: "public-read"
 };


 const uploadImage = await s3Upload(bucketOptions);

 return res.status(200).json({ uploadImage });

  } catch (error) {
return res.status(500).json({error: error.message});
  }
});

export default Router;*/
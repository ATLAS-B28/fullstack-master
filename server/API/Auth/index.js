import express from "express";
import passport from "passport";
import { UserModel } from "../../database/allModels.js";
import { ValidateSignIn, ValidateSignUp } from "../../validation/auth.js";
const router = express.Router();
//this is for auth
//params - none
//have the users email and password
// /signup route
//post to the server as a new user
router.post("/signup", async (req, res) => {
  try {
    //take the credentials and pass through validate
    await ValidateSignUp(req.body.credential)
    //check whether the user is already there or not
    await UserModel.findByEmailAndContact(req.body.credential)
   //after this hashing by pre middleware and then creation of obj in DB
   
    //if not create new user and save to DB
   const newUser = await UserModel.create(req.body.credential);
     //then generate a new jwt token
     const newToken = newUser.genToken()
    
    return res.status(200).json({newToken});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//this is for sign in
//params - none
//have the users email and password
// /signin route
//post to the server as existing user
router.post("/signin", async (req, res) => {
  try {
    //validate using a function the user's credentials
     await ValidateSignIn(req.body.credential) 
    //find the email and password and check in database
    const user = await UserModel.findByEmailAndPassword(req.body.credential);
    //generate jwt auth token
    const token = user.genToken();
    return res.status(200).json({token,status:"Success"});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//this is for sign in
//params - none
//description - google signin
// /google route
//get method
router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ],
  })
);
//this is google callback
//google signin callback
// /google/callback route
//get method
router.get("/google/callback", passport.authenticate("google",{failureRedirect: "/"}),
(req,res) => {
  return res.json({token: req.session.passport.user.token});
}
);

export default router;
/*

 * Static methods apply to the entire model
 * on which they are defined whereas instance 
 * methods apply only to a specific document within
 * the collection
 */
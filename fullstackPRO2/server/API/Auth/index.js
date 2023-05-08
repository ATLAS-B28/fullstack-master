import express from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";
import { UserModel } from "../../database/allModels.js";
const router = express.Router();
//this is for auth
//params - none
//have the users email and password
// /signup route
//post to the server as a new user
router.post("/signup", async (req, res) => {
  try {
    //take the credentials and pass through validate
    const { email, password, fullname, contact } = req.body.credential;
    //check whether the user is already there or not
    const checkUserByEmail = await UserModel.findOne({ email });
    const checkUserByContact = await UserModel.findOne({ contact });
    if (checkUserByEmail || checkUserByContact)
      return res.json({ error: "User already exists" });

    ///look for the password and do the hashing
    const bcryptSalt = await  bcryptjs.genSalt(8)
    const hashedPassword = await bcryptjs.hash(password,bcryptSalt)
   
    //if not create new user and save to DB
   await UserModel.create({
        ...req.body.credential,//the body is spread to include everything a good use of spread operator
        password:hashedPassword
    });
     //then generate a new jwt token
     const newToken = jwt.sign({ user: { fullname, email } }, "Zomato App");
    
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

    //find the email and password and check in database
    const user = "";
    //generate jwt auth token
    const token = "";
    return res.status(200).json({ message: "Sign in done!!" });
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
    scope: [],
  })
);
//this is google callback
//google signin callback
// /google/callback route
//get method
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    return res.json({ message: "Google callback" });
  }
);

export default router;

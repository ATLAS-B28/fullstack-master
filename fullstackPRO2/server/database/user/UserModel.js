import mongoose from "mongoose";
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken";

const UserScehma = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    address: [
      {
        detail: {
          type: String,
        },
        for: {
          type: String,
        },
      },
    ],
    contact: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);
//instance method applied on instance
UserScehma.methods.genToken = function(){
  return jwt.sign({user:this._id.toString()},"ZomatoApp")
}
//static methods applied on entire model
UserScehma.statics.findByEmailAndPassword = async ({email,password})=>{
  //check the email exists
  const user = await UserModel.findOne({email})
  if(!user) throw new Error("User doesnot exist")
  //compare password
  const doesPasswordMatch = bcryptjs.compare(password, user.password)
  if(!doesPasswordMatch) throw new Error("invalid password")
  return user
}
UserScehma.statics.findByEmailAndContact = async ({email,contact})=>{
  const checkUserByEmail = await UserModel.findOne({email})
  const checkuserByContact = await UserModel.findOne({contact})
  if(checkUserByEmail||checkuserByContact)
   throw new Error("User already exist")
  
  return false
}
//pre middleware func.s are exexcuted one after another with each of middleware calls next
UserScehma.pre("save",function(next){
  const user = this //refers to the body from req that we are passing
  if(!user.isModified("password"))//if user has not given is not modified 
   return next()
  //then to do the hashing safely
  bcryptjs.genSalt(8,(error,salt)=>{
    //if hashing working fine
    if(error) return next(error)
    //then
    bcryptjs.hash(user.password,salt,(error,hash)=>{
      if(error) return next(error)

      //insert the hashed password
      user.password = hash
      return next()
    })
  })
})
export const UserModel = mongoose.model("Users", UserScehma);

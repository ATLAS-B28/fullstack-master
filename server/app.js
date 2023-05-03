//env variable
import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import helmet from "helmet"
import passport from "passport"
//config imports
 //google auth config
 //routes config
//API imports
 //auth
 //resturant
 //food
 //menu
 //image
 //orders
 //reviews
//database connection
 //connection
const app = express()
const PORT = process.env.PORT || 5000
//using express middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(helmet())
app.use(cors())
app.use(passport.initialize())
app.use(passport.session())
//passport config 
//routes
 //auth
 //restaurant
 //food
 //menu
 //image
 //order
 //reviews
//listening the server at 4000 and also connect to DB
app.listen(PORT,()=>console.log(`App started at - ${PORT}`))
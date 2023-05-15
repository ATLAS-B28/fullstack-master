//env variable
import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import helmet from "helmet"
import passport from "passport"
import googleConfig from "./config/google.config.js"
import routeConfig from "./config/route.config.js"
//config imports
 //google auth config
 //routes config
//API imports
 //auth
 import Auth from './API/Auth/index.js'
 //resturant
 import Restaurant from "./API/Restaurant/index.js"
 //food
 import Food from "./API/Food/index.js"
 //menu
 import Menu from "./API/Menu/index.js"
 //image
 import Image from "./API/Image/index.js"
 //orders
 import Orders from "./API/orders/index.js"
 //reviews
 import Reviews from "./API/reviews/index.js"
//database connection
 //connection
import connection from "./database/connection.js"
import session from "express-session"
const app = express()
const PORT = process.env.PORT || 5000
//using express middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(helmet())
app.use(cors())
//passport config 
app.use(session({
   secret:"ZomatoApp",
   resave:false,
   saveUninitialized:false,
   cookie:{secure:true}
}))
app.use(passport.initialize())

app.use(passport.session())
googleConfig(passport)
routeConfig(passport)
//routes
 //basic 
 app.get("/",(req,res)=>{
    res.json({message:"Set up done!!"})
 })
 //auth
 app.use("/auth",Auth)
 //restaurant
 app.use("/restaurant",Restaurant)
 //food
 app.use("/food",Food)
 //menu
 app.use("/menu",Menu)
 //image
 app.use("/image",Image)
 //order
 app.use("/order",Orders)
 //reviews
 app.use("/reviews",Reviews)
//listening the server at 4000 and also connect to DB
app.listen(PORT,()=>
 connection()
  .then(()=>console.log("Server is up and running"))
  .catch(()=>console.log("DB connection failed"))
)

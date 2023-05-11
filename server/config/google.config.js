import googleOAuth from "passport-google-oauth20"
import { UserModel } from "../database/allModels.js"
import passport from "passport"
const strategy = googleOAuth.Strategy
export default (passport)=>{
    passport.use(
        new strategy({
            clientID:process.env.GOOGLE_AUTH,
            clientSecret:process.env.GOOGLE_SECERT,
            callbackURL:"http://localhost:4000/auth/google/callback"
        },
        async (accessToken,refreshToken,profile,done)=>{
          const newUser = {
            fullname:profile.displayname,
            email:profile.emails[0].value,//1st email for google auth
            profilePic:profile.photos[0].value  
        }
        try {
            const user = await UserModel.findOne({email:newUser.email})
            if(user){
                const token = user.genToken()//if so generate token
                //and use done func
                done(null,{user,token})
            }
            else
            {
              //else create new user
              const user = await UserModel.create(newUser)
              const token = user.genToken()
              done(null,{user,token})
            }
        } catch (error) {
            done(error,null)
        }
        })
    )
    //serialize user
    passport.serializeUser((userData,done)=> done(null,{...userData}))
    passport.deserializeUser((id,done)=>done(null,id))
}
/**
 * 
 * 

Where does user.id go after passport.serializeUser has been called?
The user id (you provide as the second argument of
 the done function) is saved in the session and is 
 later used to retrieve the whole object via the
  deserializeUser function.

serializeUser determines which data of the 
user object should be stored in the session.
 The result of the serializeUser method is 
attached to the session as
 req.session.passport.user = {}. 
 Here for instance, it would be (as 
 we provide the user id as the key) 
 req.session.passport.user = {id: 'xyz'}
 * We are calling passport.deserializeUser
  right after it where does it fit in the workflow?
The first argument of deserializeUser 
corresponds to the key of the user object
 that was given to the done function (see 1.).
  So your whole object is retrieved with help of
   that key. That key here is the user id (key 
    can be any key of the user object i.e. name,
    email etc). In deserializeUser that key is
     matched with the in memory array / 
     database or any data resource.

The fetched object is attached to the request 
object as req.user


Visual Flow

passport.serializeUser(function(user, done) {
    done(null, user.id);
});              │
                 │ 
                 │
                 └─────────────────┬──→ saved to session
                                   │    req.session.passport.user = {id: '..'}
                                   │
                                   ↓           
passport.deserializeUser(function(id, done) {
                   ┌───────────────┘
                   │
                   ↓ 
    User.findById(id, function(err, user) {
        done(err, user);
    });            └──────────────→ user object attaches to the request as req.user   
});
 */
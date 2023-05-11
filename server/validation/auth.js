//middleware to validate and do something
import joi from 'joi'
export const ValidateSignUp = (userdata)=>{
    //create a schema for validation
    const Schema = joi.object({
        fullname:joi.string().required().min(4),
        email:joi.string().email(),
        password:joi.string().min(5),
        address:joi.array().items(joi.object({
            detail:joi.string() ,for:joi.string()       
         })),
        contact:joi.number()
    })
    return Schema.validateAsync(userdata)
}
export const ValidateSignIn = (userdata)=>{
    const Schema = joi.object({
        email:joi.string().email().required(),
        password:joi.string().min(5).required()
    })
    return Schema.validateAsync(userdata)//compare the incoming user data
}
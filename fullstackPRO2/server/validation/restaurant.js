import joi from "joi"
export const ValidateRestaurantCity = (restaurantObj)=>{
    const Schema = joi.object({
        city:joi.string().required()
    })
    return Schema.validateAsync(restaurantObj)
}
export const ValidateResSearchString = (restaurantObj)=>{
    const Schema = joi.object({
        searchString:joi.string().required()
    })
    return Schema.validateAsync(restaurantObj)
}
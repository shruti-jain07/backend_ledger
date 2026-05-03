const Joi=require("joi")
const registerSchema=Joi.object({
    body:Joi.object({
        name:Joi.string().trim().min(2).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(6).pattern(new RegExp("^[a-zA-Z0-9@#]+$")).required()
    }) 
})
const loginSchema=Joi.object({
    body:Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().required()
    })
})
module.exports={
    registerSchema,loginSchema
}
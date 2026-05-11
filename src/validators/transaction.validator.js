const Joi=require("joi")
const transactionSchema=Joi.object({
    body:Joi.object({
        fromAccount:Joi.string().required(),
        toAccount:Joi.string().required(),
        amount:Joi.number().min(1).required(),
        idempotencyKey:Joi.string().required()
    })
})
module.exports={transactionSchema}
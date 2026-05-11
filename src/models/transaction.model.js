const mongoose=require("mongoose")
const transactionSchema=new mongoose.Schema(
    {
        fromAccount:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"account",
            required:true
        },
        toAccount:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"account",
            required:true
        },
        amount:{
            type:Number,
            required:true,
            min:1
        }
        ,
        status:{
            type:String,
            enum:["PENDING","SUCCESS","FAILED","REVERSED"],
            default:"PENDING"
        },
        idempotencyKey:{
            type:String,
            required:true,
            index:true,
            unique:true
        }
    },
    {
        timestamps:true
    }
)
transactionSchema.index({fromAccount:1})
transactionSchema.index({toAccount:1})

const transactionModel=mongoose.model("transaction",transactionSchema)
module.exports=transactionModel
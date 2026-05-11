const mongoose=require('mongoose')
const ERROR_CODES = require('../constants/errorCodes')
const AppError=require("../utils/AppError")
const ledgerSchema=new mongoose.Schema({
    account:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"account",
        required:[true,"Ledger must be associated with an account"],
        index:true,
        immutable:true
    },
    amount:{
        type:Number,
        required:[true,"Amount is required for creating a ledger entry"],
        immutable:true,
        min:1
    },
    transaction:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"transaction",
        required:[true,"Ledger must be associated with a transaction"],
        index:true,
        immutable:true 
    },
    type:{
        type:String,
        enum:{
            values:["CREDIT","DEBIT"],
            message:"Type can be either CREDIT or DEBIT",
        },
        required:[true,"Ledger type is required"],
        immutable:true
    }
},
{
    timestamps:true
}
)
function preventLedgerModification(next){
    return next(
        new AppError("Ledger entries cannot be modified or deleted",400,ERROR_CODES.BAD_REQUEST)
    )
}
ledgerSchema.pre("save",function(next){
  if(!this.isNew){
    return next(
        new AppError("Ledger entries cannot be modified",400,ERROR_CODES.BAD_REQUEST)
    )
  }
})
ledgerSchema.pre('findOneAndUpdate',preventLedgerModification)
ledgerSchema.pre('updateOne',preventLedgerModification)
ledgerSchema.pre('deleteOne',preventLedgerModification)
ledgerSchema.pre('remove',preventLedgerModification)
ledgerSchema.pre('deleteMany',preventLedgerModification)
ledgerSchema.pre('updateMany',preventLedgerModification)
ledgerSchema.pre('findOneAndDelete',preventLedgerModification)
ledgerSchema.pre('findOneAndReplace',preventLedgerModification)
const ledgerModel=mongoose.model("ledger",ledgerSchema)
module.exports=ledgerModel
/**
 * create transaction
 * update transaction status
 * find transaction by idempotency key
 * find transaction by id
 */
const Transaction=require("../models/transaction.model")
//create transaction
const createTransaction=(data,session=null)=>{
    return Transaction.create([data],{session})
}
//update transaction status
const updateTransactionStatus=(transactionId,status,session=null)=>{
    return Transaction.findByIdAndUpdate(
        transactionId,{status},
        {
            new:true,
            session
        }
)
}
//find by idempotency key
const findByIdempotencyKey=(idempotencyKey)=>{
    return Transaction.findOne({idempotencyKey})
}
//find transaction by id
const findTransactionById=(transactionId)=>{
    return Transaction.findById({transactionId})
}
module.exports={createTransaction,updateTransactionStatus,findByIdempotencyKey,findTransactionById}
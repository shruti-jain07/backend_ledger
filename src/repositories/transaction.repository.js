/**
 * create transaction
 * update transaction status
 * find transaction by idempotency key
 * find transaction by id
 * get transactions
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
//get transactions
const getTransactionByAccounts=(accountIds,skip,limit)=>{
    return Transaction.find({
        $or:[
                {fromAccount:{$in:accountIds}},
                {toAccount:{$in:accountIds}},
            ]
    })
    .sort({createdAt:-1})
    .skip(skip)
    .limit(limit)
}
module.exports={createTransaction,updateTransactionStatus,findByIdempotencyKey,findTransactionById,getTransactionByAccounts}
const account=require("../models/account.model")
const createAccount=(data)=>{
    return account.create(data)
}
const getAccountByUser=(userId)=>{
    return account.find({user:userId})
}
const findAccountById=(accountId)=>{
    return account.findById(accountId)
}
const findAccountByUserId=(userId)=>{
    return account.findOne({user:userId})
}

const findSystemUser=
module.exports={createAccount,getAccountByUser,findAccountById,findAccountByUserId}

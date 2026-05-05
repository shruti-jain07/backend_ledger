const account=require("../models/account.model")
const createAccount=(data)=>{
    return account.create(data)
}
const getAccountByUser=(userId)=>{
    return account.find({user:userId})
}
module.exports={createAccount,getAccountByUser}
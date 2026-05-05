const accountRepository=require("../repositories/account.repository")
const createAccount=async(userId)=>{
    return accountRepository.createAccount({
        user:userId
    })
}
const getAccounts=async(userId)=>{
    return accountRepository.getAccountByUser(userId)
}
module.exports={createAccount,getAccounts}
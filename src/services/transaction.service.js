/**
*   ownership validation
*   account validation
*   same-account prevention
*   balance derivation from ledger
*   transaction sessions
*   atomic rollback
*   transaction creation
*   ledger entries
*   transaction status updates
*   idempotency
 */

/************************ */
const mongoose=require("mongoose")

const transactionRepository=require("../repositories/transaction.repository")
const ledgerRepository=require("../repositories/ledger.repository")
const accountRepository=require("../repositories/account.repository")

const AppError=require("../utils/AppError")
const ERROR_CODES=require("../constants/errorCodes")

//transaction processor
const processTransaction=async({
    fromAccount,toAccount,amount,idempotencyKey
})=>{
    const session=await mongoose.startSession()
    session.startTransaction()
    try{
        //create transaction
        const transaction=await transactionRepository.createTransaction(
            {
                fromAccount,toAccount,amount,status:"PENDING",idempotencyKey
            },
            session
        )
    
        const createdTransaction=transaction[0]
        //create debit ledger entry
        await ledgerRepository.createLedgerEntry(
            {
                account:fromAccount,
                amount,
                transaction:createdTransaction._id,
                type:"DEBIT"
            },
            session
        )
        //create credit ledger entry
         await ledgerRepository.createLedgerEntry(
            {
                account:toAccount,
                amount,
                transaction:createdTransaction._id,
                type:"CREDIT"
            },
            session
        )
        //transaction success
        const updatedTransaction=await transactionRepository.updateTransactionStatus(
            createdTransaction._id,"SUCCESS",session
        )
        await session.commitTransaction()
        await session.endSession()
        return updatedTransaction
    }catch(err){
        await session.abortTransaction()
        await session.endSession()
        throw err
    }
}
//transfer
const transfer=async(userId,{fromAccount,toAccount,amount,idempotencyKey})=>{
    //validate request
    if(!fromAccount||!toAccount||!amount||!idempotencyKey){
        throw new AppError("Required fields missing",400,ERROR_CODES.BAD_REQUEST)
    }
    
    //preventing same account transfer
    if(fromAccount===toAccount){
        throw new AppError("Cannot Transfer to same account",400,ERROR_CODES.BAD_REQUEST)
    }
    //fetch accounts
    const senderAccount=await accountRepository.findAccountById(fromAccount)
    
    const receiverAccount=await accountRepository.findAccountById(toAccount)
    //validate accounts (exists or not)
    if(!senderAccount||!receiverAccount){
        throw new AppError("Account not found",404,ERROR_CODES.NOT_FOUND)
    }
    //validation for user can only send from their own account
    if(senderAccount.user.toString()!==userId.toString()){
        throw new AppError("Unauthorized account access",403,ERROR_CODES.FORBIDDEN
        )
    }
    //status validation (both accounts should be active)
    if(senderAccount.status!=="ACTIVE"){
        throw new AppError("Sender account is not active",400,ERROR_CODES.BAD_REQUEST)
    }
    if(receiverAccount.status!=="ACTIVE"){
        throw new AppError("Receiver account is not active",400,ERROR_CODES.BAD_REQUEST)
    }
    //dupliate transaction
    const existingTransaction=await transactionRepository.findByIdempotencyKey(idempotencyKey)
    if(existingTransaction){
        if(existingTransaction.status==="SUCCESS"){
            throw new AppError("Transaction already processed",409,ERROR_CODES.CONFLICT)
        }
        
        if(existingTransaction.status==="PENDING"){
        throw new AppError("Transaction is still in progress",409,ERROR_CODES.CONFLICT)
    }

    if(existingTransaction.status==="FAILED"){
        throw new AppError("Transaction failed. Please retry",409,ERROR_CODES.CONFLICT)
    }
    }
    //balance calculation
   const senderBalance=await senderAccount.getBalance()
    //checking for insufficient balance
    if(senderBalance<amount){
        throw new AppError("Insufficient Balance",400,ERROR_CODES.BAD_REQUEST)
    }
     return await processTransaction({
        fromAccount,
        toAccount,
        amount,
        idempotencyKey
    })
    
}
//system initial funds transfer
const initialFundsTransfer=async(systemUserId,{
    toAccount,amount,idempotencyKey
})=>{
    //validate request
    if(!toAccount||!amount||!idempotencyKey){
        throw new AppError("Required fields missing",400,ERROR_CODES.BAD_REQUEST)
    }
     //system account
     const senderAccount=await accountRepository.findAccountByUserId(systemUserId)
    
     if(!senderAccount){
        throw new AppError("System Account Not Found",404,ERROR_CODES.NOT_FOUND)
     }
   //cannot transfer to same account
    if(senderAccount._id.toString()===toAccount.toString()){
    throw new AppError("Cannot transfer to same account",400,ERROR_CODES.BAD_REQUEST)
        }
    //fetch accounts
    
     //receiver account
    const receiverAccount=await accountRepository.findAccountById(toAccount)
    //validate accounts (exists or not)
    if(!receiverAccount){
        throw new AppError("Receiver Account not found",404,ERROR_CODES.NOT_FOUND)
    }
   
    //status validation (account should be active)
   if(senderAccount.status!=="ACTIVE"){
        throw new AppError("System account is not active",400,ERROR_CODES.BAD_REQUEST)
    }
    if(receiverAccount.status!=="ACTIVE"){
        throw new AppError("Receiver account is not active",400,ERROR_CODES.BAD_REQUEST)
    }
    //duplicate transaction validation
    const existingTransaction=await transactionRepository.findByIdempotencyKey(idempotencyKey)
    if(existingTransaction){
        if(existingTransaction.status==="SUCCESS"){
            throw new AppError("Transaction already processed",409,ERROR_CODES.CONFLICT)
        }
        
        if(existingTransaction.status==="PENDING"){
        throw new AppError("Transaction is still in progress",409,ERROR_CODES.CONFLICT)
    }

    if(existingTransaction.status==="FAILED"){
        throw new AppError("Transaction failed. Please retry",409,ERROR_CODES.CONFLICT)
    }
    }
    //system balance check
    const senderBalance=await senderAccount.getBalance()
    
    if(senderBalance<amount){
        throw new AppError("Insufficient system balance",400,ERROR_CODES.BAD_REQUEST)
    }
    return await processTransaction({
        fromAccount: senderAccount._id,
        toAccount,
        amount,
        idempotencyKey
    })
}
module.exports={transfer,initialFundsTransfer}
/************************ */

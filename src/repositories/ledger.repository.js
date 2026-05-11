/**
 * create ledger entry
 * fetch ledger entries of acccount
 */
const Ledger=require("../models/ledger.model")
//create ledger entry
const createLedgerEntry=(data,session=null)=>{
    return Ledger.create([data],{session})
}
//get all ledger entries of an account
const getLedgerEntriesByAccount=(accountId)=>{
    return Ledger.find({account:accountId})
}
module.exports={createLedgerEntry,getLedgerEntriesByAccount}
const mongoose = require("mongoose")
const ledgerModel=require("./ledger.model")
const accountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index:true
    },
    status: {
        type:String,
        enum:["ACTIVE", "FROZEN", "CLOSED"],
        default:"ACTIVE",
    },
    currency: {
      type: String,
      enum:["INR","USD","EUR"],
      default: "INR",
    },
  },
  {
    timestamps: true,
  },
)
accountSchema.index({user:1,status:1})//compound index
accountSchema.methods.getBalance=async function(){
  const balanceData=await ledgerModel.aggregate([
        {
            $match:{
                account:this._id
            }
        },
        {
            $group:{
                _id:null,
                totalDebit:{
                    $sum:{
                        $cond:[
                            {$eq:["$type","DEBIT"]},
                            "$amount",
                            0
                        ]
                    }
                },
                totalCredit:{
                    $sum:{
                        $cond:[
                            {$eq:["$type","CREDIT"]},
                            "$amount",
                            0
                        ]
                    }
                }
            }
        },
        {
            $project:{
                _id:0,
                balance:{
                    $subtract:[
                        "$totalCredit",
                        "$totalDebit"
                    ]
                }
            }
        }
    ])

    return balanceData.length>0 ? balanceData[0].balance : 0
}
const accountModel=mongoose.model("account",accountSchema)
module.exports=accountModel
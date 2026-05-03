const { required } = require("joi")
const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const userSchema=new mongoose.Schema(
    {   email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true
        },
        name:{
            type:String,
            required:true,
            trim:true
        },
        password:{
            type:String,
            required:true,
            minlength:6,
            select:false
        }
    },
    {
        timestamps:true
    }
)
//if password modified then hash it
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return

  this.password = await bcrypt.hash(this.password, 10)
})

//password compare
userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

const userModel=mongoose.model("user",userSchema)
module.exports=userModel
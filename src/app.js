const express=require("express")

const app=express()

const routes=require("./routes")
const errorHandler=require("./middlewares/errorHandler")
const requestLogger=require("./middlewares/requestLogger")
app.use(express.json())
app.use(errorHandler)
app.use(requestLogger)
module.exports=app

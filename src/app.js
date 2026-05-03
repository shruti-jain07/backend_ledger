const express=require("express")
const cookieParser=require("cookie-parser")

const app=express()

const routes=require("./routes")
const errorHandler=require("./middlewares/errorHandler")
const requestLogger=require("./middlewares/requestLogger")

//body-parser
app.use(express.json())
//cookie-parser
app.use(cookieParser())
//request-logging
app.use(requestLogger)
//routes
app.use("/api",routes)

//error-handler
app.use(errorHandler)
module.exports=app

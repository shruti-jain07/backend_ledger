const express=require("express")
const cookieParser=require("cookie-parser")

const app=express()

const swaggerUi=require("swagger-ui-express")
const swaggerSpec=require("./config/swagger")

const routes=require("./routes")
const errorHandler=require("./middlewares/errorHandler")
const requestLogger=require("./middlewares/requestLogger")
//swagger ui
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec))
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
app.get("/",(req,res)=>{
    res.send("Ledger is running")
})
module.exports=app

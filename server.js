require("dotenv").config()
const cors=require("cors")
const app=require("./src/app")
const connectDB=require("./src/config/db")
const {successResponse}=require("./src/utils/response");
connectDB()
const PORT=process.env.PORT||3000
app.use(cors({
  origin: "*",
  credentials: true
}));
app.get("/health", (req, res) => {
  return successResponse(
    res,
    "Server is running",
    { uptime: process.uptime() }
  );
});
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
const successResponse=(res,message,data={})=>{
    return res.status(200).json({
        success:true,
        message,
        data,
        error:null
    })
}
const errorResponse=(res,message,code="SERVER ERROR",details=[],status=500)=>{
    return res.status(status).json({
        success:false,
        message,
        data:null,
        error:{
             code,details
            }
    })  
}
module.exports={
    successResponse,errorResponse
}
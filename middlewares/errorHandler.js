const { StatusCodes } = require("http-status-codes")
const { CustomeAPIError } = require("../errors")

const errorHandler=(err,req,res,next)=>{
    if(err instanceof CustomeAPIError){
        return res.status(err.statusCode).json({msg:err.message})
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"something went wrong",err})
}


module.exports={
    errorHandler
}
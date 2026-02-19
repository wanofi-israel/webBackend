const { StatusCodes } = require("http-status-codes")
const { NotFoundError } = require("../errors")
const jobModel=require("../models/jobs")

const createJob=async(req,res)=>{

    req.body.createdBy=req.user.userId
    const job=await jobModel.create({...req.body})
    if(job){
        res.status(200).json({msg:"create",job})
    }
}
const getAllJobs=async(req,res)=>{

    const user=req.user
    const page = parseInt(req.query.offset) || 1;
  const limit = parseInt(req.query.limit) || 10;
const {position,location}=req.query
  const skip = (page - 1) * limit;
    let filter={}
    let result
    if(position){
        filter.position={$regex:position,$options:'i'}
    }
    if(location){
        filter.location={$regex:location,$options:'i'}
    }
    const totalCount=await jobModel.countDocuments(filter)
    result=jobModel.find(filter)
    const job=await result.select("position company location deadline createdAt job_summary").sort("-createdAt").skip(skip).limit(10)

    if(!job){
        throw new NotFoundError('No Job was Found')
    }
    res.status(200).json({count:totalCount,page,
    limit,
    totalPages: Math.ceil(totalCount / limit),
    hasNextPage: page < Math.ceil(totalCount / limit),
    hasPrevPage: page > 1,job})

}
const getSingleJob=async(req,res)=>{
    const {id:jobId}=req.params
    const job=await jobModel.findOne({_id:jobId})

    if(!job){
        throw new NotFoundError(`No Job with is ${jobId} was found`)
    }

    res.status(StatusCodes.OK).json(job)
}
const updateJob=async(req,res)=>{
    const body=req.body
    const {id:jobId}=req.params
    const job=await jobModel.findOneAndUpdate({_id:jobId},body,
        {new:true,
            runValidators:true}
        )
        
        if(!job){
            throw new NotFoundError(`No Job with is ${jobId} was found`)
        }
        res.status(StatusCodes.OK).json(job)
        
    }
    const deleteJob=async(req,res)=>{
        
        const {id:jobId}=req.params
    const job=await jobModel.findOneAndDelete({_id:jobId})

    if(!job){
        throw new NotFoundError(`No Job with is ${jobId} was found`)
    }
    res.status(200).json({msg:"delete job"})
}


module.exports={
    createJob,
    getAllJobs,
    getSingleJob,
    updateJob,
    deleteJob
}
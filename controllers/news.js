const { StatusCodes } = require("http-status-codes")
const { NotFoundError } = require("../errors")
const newsModel=require("../models/news")

const createNews=async(req,res)=>{

    req.body.createdBy=req.user.userId
    const news=await newsModel.create({...req.body})
    if(news){
        res.status(200).json({msg:"create",news})
    }
}
const getAllNews=async(req,res)=>{

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
    const totalCount=await newsModel.countDocuments(filter)
    result=newsModel.find(filter)
    const news=await result.select("headline summary image createdAt").sort("-createdAt").skip(skip).limit(10)

    if(!news){
        throw new NotFoundError('No News was Found')
    }
    res.status(200).json({count:totalCount,page,
    limit,
    totalPages: Math.ceil(totalCount / limit),
    hasNextPage: page < Math.ceil(totalCount / limit),
    hasPrevPage: page > 1,news})

}
const getSingleNews=async(req,res)=>{
    const {id:newsId}=req.params
    const news=await newsModel.findOne({_id:newsId})

    if(!news){
        throw new NotFoundError(`No News with is ${newsId} was found`)
    }

    res.status(StatusCodes.OK).json(news)
}
const updateNews=async(req,res)=>{
    const body=req.body
    const {id:newsId}=req.params
    const news=await newsModel.findOneAndUpdate({_id:newsId},body,
        {new:true,
            runValidators:true}
        )
        
        if(!news){
            throw new NotFoundError(`No News with is ${newsId} was found`)
        }
        res.status(StatusCodes.OK).json(news)
        
    }
    const deleteNews=async(req,res)=>{
        
        const {id:newsId}=req.params
    const news=await newsModel.findOneAndDelete({_id:newsId})

    if(!news){
        throw new NotFoundError(`No News with is ${newsId} was found`)
    }
    res.status(200).json({msg:"delete news"})
}


module.exports={
    createNews,
    getAllNews,
    getSingleNews,
    updateNews,
    deleteNews
}
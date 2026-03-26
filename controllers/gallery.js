const { NotFoundError } = require('../errors')
const galleryModel=require('../models/gallery')


const postGallery=async (req,res)=>{
        const gallery=await galleryModel.create(req.body)
        return res.status(200).json({data:gallery,msg:"create galley successful"})
    
}
const getAllGallery=async (req,res)=>{

    //     const page = parseInt(req.query.offset) || 1;
//   const limit = parseInt(req.query.limit) || 10;
// const skip = (page - 1) * limit;
// const totalCount=await galleryModel.countDocuments({})
//         const gallery=await galleryModel.find({}).sort("-createdAt").skip(skip).limit(10)

//         return res.status(200).json({count:totalCount,page,
//     limit,
//     totalPages: Math.ceil(totalCount / limit),
//     hasNextPage: page < Math.ceil(totalCount / limit),
//     hasPrevPage: page > 1,gallery})

  const gallery=await galleryModel.find({})

        return res.status(200).json({data:gallery,msg:"get all galley successful"})    
}

const getSingleGallery=async (req,res)=>{
    const {id}=req.params
    const gallery=await galleryModel.findOne({_id:id})

    if(!gallery){
        return NotFoundError(`No Image Found with id ${id}`)
    }
    res.status(200).json({data:gallery,msg:"get single gallery successful"})
}
const updateGallery=async (req,res)=>{
    const {id}=req.params
    const gallery=await galleryModel.findOneAndUpdate({_id:id},req.body,{
        runValidators:true,
        new:true
    })

    if(!gallery){
        return NotFoundError(`No Image Found with id ${id}`)
    }
    res.status(200).json({data:gallery,msg:"update gallery successful"})
}
const deleteGallery=async (req,res)=>{
    const {id}=req.params
    const gallery=await galleryModel.findOneAndDelete({_id:id})

    if(!gallery){
        return NotFoundError(`No Image Found with id ${id}`)
    }
    res.status(200).json({msg:"delete gallery successful"})
}


module.exports={
    postGallery,
    getAllGallery,
    getSingleGallery,
    updateGallery,
    deleteGallery
}
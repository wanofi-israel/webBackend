const { BadRequestError, UnAuthorizedError } = require('../errors')
const userModel=require('../models/users')
const {StatusCodes}=require('http-status-codes')
const register=async(req,res)=>{
        const user=await userModel.create({...req.body})
        const token=user.createJWT()
        res.status(StatusCodes.CREATED).json({name:user.name,token})
}
const login=async(req,res)=>{
    const {email,password}=req.body

    if(!email || !password){
        throw new BadRequestError('Please Provide Email and Password')
    }
    const user=await userModel.findOne({email})

    if(!user){
        throw new UnAuthorizedError('Invalid Credentialsa')
    }

    let pass=await user.comparePassword(password)

    if(!pass){
        throw new UnAuthorizedError('Invalid Credentialsa')
    }

    const token=user.createJWT()
    res.status(200).json({msg:"login",user:user.name,token})
}


module.exports={
    register,
    login
}
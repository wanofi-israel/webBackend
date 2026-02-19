const express=require("express")
const router=express.Router()
const {getSingleBusinessCard } = require("../controllers/businessCard")



router.route('/:id').get(getSingleBusinessCard)


module.exports=router
const express=require("express")
const {  getAllGallery, getSingleGallery} = require("../controllers/gallery")
const router=express.Router()

router.route('/').get(getAllGallery)
router.route("/:id").get(getSingleGallery)


module.exports=router
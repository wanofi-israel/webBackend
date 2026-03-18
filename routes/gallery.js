const express=require("express")
const { postGallery, getAllGallery, getSingleGallery, updateGallery, deleteGallery } = require("../controllers/gallery")
const router=express.Router()

router.route('/').post(postGallery).get(getAllGallery)
router.route("/:id").get(getSingleGallery).patch(updateGallery).delete(deleteGallery)


module.exports=router
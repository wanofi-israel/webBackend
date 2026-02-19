const express=require("express")
const router=express.Router()
const { getAllBusinessCards, createBusinessCard, updateBusinessCard, deleteBusinessCard, getSingleBusinessCard } = require("../controllers/businessCard")


router.route('/').get(getAllBusinessCards).post(createBusinessCard)
router.route('/:id').get(getSingleBusinessCard).patch(updateBusinessCard).delete(deleteBusinessCard)


module.exports=router
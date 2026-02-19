const express=require('express')
const { createNews, getAllNews, getSingleNews, updateNews, deleteNews } = require('../controllers/news')
const router=express.Router()

router.route('/').post(createNews).get(getAllNews)
router.route('/:id').get(getSingleNews).patch(updateNews).delete(deleteNews)


module.exports=router
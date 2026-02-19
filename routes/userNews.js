const express=require('express')
const { createNews, getAllNews, getSingleNews, updateNews, deleteNews } = require('../controllers/news')
const router=express.Router()

router.route('/').get(getAllNews)
router.route('/:id').get(getSingleNews)


module.exports=router
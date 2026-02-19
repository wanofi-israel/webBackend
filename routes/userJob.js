const express=require('express')
const { createJob, getAllJobs, getSingleJob } = require('../controllers/jobs')
const router=express.Router()

router.route('/').get(getAllJobs)
router.route('/:id').get(getSingleJob)


module.exports=router
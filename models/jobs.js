const mongoose=require('mongoose')

const jobSchema=new mongoose.Schema({
    position:{
        type:String,
        required:[true,"Position field can not be empty"],
    },
    reports_to:{
        type:String,
        required:[true,"Reports to field can not be empty"],

    },
    company:{
        type:String,
        required:[true,"company field can not be empty"],
    },
    industry:{
        type:String,
        required:[true,"Industry field can not be empty"],
    },
    location:{
        type:String,
        required:[true,"Location field can not be empty"],
    },
    deadline:{
        type:Date,
        default:Date.now()
    },
    company_description:{
        type:String,
        requiredd:[true,"Company dscription can not be empty"]
    },
    job_summary:{
        type:String,
        requiredd:[true,"Job summary can not be empty"]
    },
    position_overview:{
        type:String,
        requiredd:[true,"Position overview can not be empty"]
    },
    requirements:{
        type:Array,
        requiredd:[true,"Requiredments can not be empty"]
    },
    additional_certifications:{
        type:Array,
        requiredd:false
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        requiredd:[true,'Please Provide user']
    }
},{
    timestamps:true
})



module.exports=mongoose.model('Job',jobSchema)
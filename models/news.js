const mongoose=require('mongoose')


const newsSchema=new mongoose.Schema({
    headline:{
        type:String,
        required:[true,"Headline can not be empty"]
    },
    summary:{
        type:String,
        required:[true,"Summary can not be empty"]
    },
    image:{
        type:String,
        required:false
    },
    body:{
        type:String,
        required:[true,"Body can not be empty"]
    }
},{
    timestamps:true
})


module.exports=mongoose.model("news",newsSchema)
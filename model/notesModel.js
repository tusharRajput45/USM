const mongoose=require('mongoose')
const schema =mongoose.Schema({
    userID:{
        type:String,
        require:true,
    },
    topicname:{
        type:String,
        require:true,
    },
    discripation:{
        type:String,
        require:true,
    },
    },{
        timestamps:true
    }
)
const userNotes=mongoose.model('userNotes',schema)
module.exports=userNotes
const mongoose=require('mongoose')
const schema =mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    mobile:{
        type:Number,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    }
    },{
        timestamps:true
    }
)
const userRegister=mongoose.model('userRegister',schema)
module.exports=userRegister
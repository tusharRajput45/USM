const mongoose=require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/userDB")
.then(()=>{
    console.log("database connect succesfully");
})
.catch(()=>{
    console.log("database not connect")
})

module.exports=mongoose
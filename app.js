const express = require("express");
const app = express();

require("./config/db"); // DataBase import

const bodyparser = require("body-parser");
const path=require('path')

const dotenv=require('dotenv')
dotenv.config({path:'./config/.env'})

// static file
app.use(express.static(path.join(__dirname,'./client/build')))
app.get('*',function(req,resp){
      resp.sendFile(path.join(__dirname,'./client/build/index.html'))
})

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// Router

const userRouter = require("./router/userRouter");
app.use("/api/user", userRouter);
 
// listen server port No 5000 
const port=process.env.PORT||5050
app.listen(port, () => {
  console.log(`server running  port no ${port}`);
});

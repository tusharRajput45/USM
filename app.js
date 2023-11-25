const express = require("express");
const app = express();

require("./config/db"); // DataBase import

const bodyparser = require("body-parser");
const path=require('path')

// static file
app.use(express.static(path.join(__dirname,'../client/build')))
app.get('*',function(req,resp){
      resp.sendFile(path.join(__dirname,'../client/build/index.html'))
})

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// Router

const userRouter = require("./router/userRouter");
app.use("/api/user", userRouter);

// listen server port No 5000

app.listen(5000, () => {
  console.log(`server running  port no 5000`);
});

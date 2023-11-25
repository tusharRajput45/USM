const express=require('express')
const userRouter=express()

const userController=require('../controller/userController')

const varifyToken=require('../middleware/varifytoken')

userRouter.get('/get-user',varifyToken,userController.getUser)
userRouter.post('/login-user',userController.userLogin)
userRouter.post('/user-register',userController.userRegister)
userRouter.delete('/delete-user/:_id',userController.deleteUser)
userRouter.put('/edit-user/:_id',userController.editUser)
userRouter.post('/logout-user/:_id',userController.logoutUser)


module.exports=userRouter
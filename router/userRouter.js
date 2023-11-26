const express=require('express')
const userRouter=express()

const userController=require('../controller/userController')
const userNotesController=require('../controller/userNotesController')

const varifyToken=require('../middleware/varifytoken')

userRouter.post('/get-user',varifyToken,userController.getUser)
userRouter.post('/login-user',userController.userLogin)
userRouter.post('/user-register',userController.userRegister)
userRouter.delete('/delete-user/:_id',userController.deleteUser)
userRouter.put('/edit-user/:_id',userController.editUser)
userRouter.post('/logout-user/:_id',userController.logoutUser)



userRouter.post('/add-notes',userNotesController.createNotes)
userRouter.put('/edit-notes',userNotesController.editNotes)
userRouter.post('/all-notes',userNotesController.allNotes)
userRouter.delete('/delete-notes',userNotesController.deleteNotes)

module.exports=userRouter
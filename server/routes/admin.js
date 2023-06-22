const express=require('express');
const adminRouter=express.Router()
const adminControllers=require('../controllers/adminController')



adminRouter.post('/',adminControllers.Login)

adminRouter.get('/home',adminControllers.getAllUsers)

adminRouter.post('/addUser',adminControllers.addUser)

adminRouter.get('/editUser/:id',adminControllers.getUser)

adminRouter.post('/editUser/:id',adminControllers.editUser)

adminRouter.post('/deleteUser/:id',adminControllers.deleteUser)


module.exports= adminRouter;
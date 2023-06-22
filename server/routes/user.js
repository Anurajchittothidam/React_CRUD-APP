const express=require('express')
const router=express.Router()

const userController=require('../controllers/userController')
const {upload,deleteExistingImage} = require('../middleware/uploadImage')

router.post('/login',userController.login)

router.post('/signup',userController.signUp)

router.post('/',userController.getUser)

router.post('/profile/',userController.getUser)

router.post('/editProfile/',userController.editUser)

router.post('/uploadImage/',deleteExistingImage,upload.single('image'),userController.uploadImage)


module.exports=router
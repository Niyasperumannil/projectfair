//import
 const express = require('express')
 const userController=require('./controllers/userController')
 const projectController = require('./controllers/projectController')
 //import jwtmiddleware

 const jwtMiddleware = require('./middleware/jwtMiddleware')
const multerconfiq = require('./middleware/multer middleware')


 //instance router
 
 const router = new express.Router()

 //Register

 router.post('/register',userController.register)

 //login

 router.post('/login',userController.login)
 module.exports=router
//add-project
router.post('/add-project',jwtMiddleware,multerconfiq.single("ProjectImage"),projectController.addProjectController)

//all projects
router.get('/all-project',jwtMiddleware, projectController.getAllprojectController)
// //home projects
router.get('/home-project',projectController.getHomeprojectController)
// //user projects
router.get('/user-project',jwtMiddleware,projectController.getUserprojectController)

//remove user projects
router.delete('/remove-userproject/:id', jwtMiddleware,
   projectController.removeUserProjectController
)
//update user project
router.put('/update-userproject/:id',jwtMiddleware,multerconfiq.single('ProjectImage'),projectController.editProjectController)
//update user profile
router.put('/update-userprofile',jwtMiddleware,multerconfiq.single("profile"),userController.updateprofile)

module.exports = router

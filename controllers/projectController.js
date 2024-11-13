const projects = require('../modal/projectModal');
const users = require('../modal/userModal');

exports.addProjectController = async(req, res)=>{
   console.log('inside add project controller');
   const {Title,Language,Github,Website,Overview}= req.body
   console.log(Title,Language,Github,Website,Overview);

   const ProjectImage = req.file.filename
   console.log(ProjectImage);
   const userId =  req.payload
   console.log(userId);
   
   try{
      const existingproject = await projects.findOne({Github})
      if(existingproject){
           res.status(406).json('project already exists')
      }else{
         const newProject = new projects({
            Title,Language,Github,Website,Overview, userId,ProjectImage
         })
         await newProject.save()
         res.status(200).json(newProject)
      }
   }catch (error) {
      res.status(401).json('project adding failed due to ',error)
   }
  
  
}

//get all projects

exports.getAllprojectController = async(req,res)=>{
   //path parameter
   const searchKey=req.query.search
   console.log(searchKey);
   
   const query = {
      Language : {
         $regex:searchKey, $options:"i"
      }
   }
   
   
   try {
      const allProject = await projects.find(query)
      res.status(200).json(allProject)
      
   } catch (error) {
     res.status(401).json(error)
   }
} 
//get home project
exports.getHomeprojectController = async(req,res)=>{
   try {const allProject = await projects.find().limit(3)
      res.status(200).json(allProject)
      
   } catch (error) {
     res.status(401).json(error)
   }
} 
// //get user project
exports.getUserprojectController = async(req,res)=>{
   const userId = req.payload
   try {
      const allProject = await projects.find({userId})
      res.status(200).json(allProject)
      
   } catch (error) {
     res.status(401).json(error)
   }
} 
//remove 

exports.removeUserProjectController = async (req,res)=>{
   const {id} =req.params
   try
   {
      await projects.findByIdAndDelete({_id:id})
      res.status(200).json('deleted suucesfuly')
   }catch (error) {
      res.status(401).json(error)
   }
   
}

exports.editProjectController = async(req,res)=>{
   const {id} = req.params
   const userId = req.payload

   const {Title,Language,Github,Website,Overview,ProjectImage} = req.body

   const uploadedImage = req.file?req.file.filename:ProjectImage

   try {
      const existingproject =await projects.findByIdAndUpdate({_id:id},{
        Title,
        Language,
        Github,
        Website,
        Overview,
        ProjectImage:uploadedImage,
        userId
      },{new:true})

      await existingproject.save()
      res.status(200).json(existingproject)
      
   } catch (error) {
      res.status(401).json(error)
   }
}



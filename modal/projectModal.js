const  mongoose  = require("mongoose");



const projectSchema = new mongoose.Schema({
    Title:{
        required:true,
        type:String
    }, 
    Language:{
        required:true,
          type:String
    }, 
    Github:{
        required:true,
          type:String
    },  
    Website:{
        required:true,
          type:String
    }, 
    Overview:{
        required:true,
          type:String
    },    
    ProjectImage:{
        required:true,
          type:String
    }, 
    userId:{
        required:true,
          type:String
    }             
})

//modal
const projects = mongoose.model('projects',projectSchema)

//exports

module.exports = projects
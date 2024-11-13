const users = require("../modal/userModal");
const jwt =require('jsonwebtoken')

//register






exports.register=async(req,res)=>{
    //logic
    console.log('Inside register function');

    const {username,email,password}=req.body
    console.log(username,email,password);
    try {
        const existngUser =await users.findOne({ email})
        if(existngUser){
            res.status(406).json('user already exists')
        }
        else{
            const newUser = new users({
                username,
                email,
                password,
                profile:"",
                github:"",
                linkedin:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }

    } catch (error) {
        res.status(401).json(error)

    }
    
}

//login
exports.login = async(req, res)=>{
    const{email, password}=req.body
    console.log(email, password);
    try {
        const existngUser = await users.findOne({email, password})
        if (existngUser){
            const token =jwt.sign({userId:existngUser._id},'secretkey')
            res.status(200).json({existngUser,token})
        }else {
            res.status(406).json("Incorrect email or password")
        }
    } catch (error) {
        res.status(401).json(error)
        
    }
}

exports.updateprofile=async(req,res)=>{
    const {username,email,password,github,linkedin,profile}=req.body
    const userid = req.payload
    const uploadedimage=req.file?req.file.filename:profile
    try{
        const existingprofile=await users.findByIdAndUpdate({_id:userid},{
            username,
            email,
            password,
            profile:uploadedimage,
            github,
            linkedin
        },{new:true})
        await existingprofile.save()
        res.status(200).json(existingprofile)
 
 
    }catch(err){
        res.status(401).json(err)
 
    }
 
 
    
 
 }

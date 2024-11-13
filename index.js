require('dotenv').config()
//import express

const express = require('express')
//import cors
const cors=require('cors')
//import router
const router=require('./router')

//import connection
require('./connection')
//create server

const pfServer = express()
//server using cors
pfServer.use(cors())
//
pfServer.use(express.json())
//use router
pfServer.use(router)
//
//

const PORT = 4000 || process.env.PORT

//
pfServer.listen(PORT,()=>{
    console.log(`server running succesfuly ${PORT}`);
    
})
//exporting upload folder
pfServer.use('/upload',express.static('./uploads'))

// pfServer.get('/',(req,res)=>{
//     res.send('get request recived')
// })
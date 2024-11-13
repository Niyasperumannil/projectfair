const multer  = require('multer')

const storage = multer.diskStorage({
    destination:(req, file, callback)=>{
        callback(null , './uploads')
    },
    filename: (req, file, callback)=>{
        //Returns the number of milliseconds elapsed since midnight, January 1, 1970 Universal Coordinated Time (UTC).
       const filename = `image- ${Date.now()}-${file.originalname}`
       callback(null, filename)


    }
})
//fileFilter

const fileFilter =(req, file, callback)=>{
    if(file.mimetype=='image/png' || file.mimetype=='image/png' || file.mimetype=='image/png'){
        callback(null, true)
    }
    else{
        callback(null, false)
        return callback(new Error('only png,jpg,jpeg files are allowed'))
    }
}

//multer confiq create

const multerconfiq = multer({
    storage,
    fileFilter
})

//export
module.exports = multerconfiq



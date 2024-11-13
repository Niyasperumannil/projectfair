const mongoose = require('mongoose')

connectionstring=process.env.DATABASE

mongoose.connect(connectionstring).then(()=>{
    console.log('mongodb connected succesfuly');
    
}).catch((err)=>{
    console.log(`mongobd connected failed ${err}`);
    
})
const mongoose = require('mongoose')

mongoose.connect('mongodb://0.0.0.0:27017/events' , (err)=>{
    
    if (err) {
        console.log(err)
    }else{
            console.log("db connected Succesfuly ...")
        }
})

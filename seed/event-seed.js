const db = require('../config/database')
const Event = require('../models/Event')

let newEvent = new Event({
    title : 'This is Event 1',
    description : 'this is a test event on Event1',
    location : 'Tunisia',
    date : Date.now()
})

newEvent.save ( (err)=>{
    if (!err){
        console.log("record was added");
    } else {
        console.log(err);
    }
})
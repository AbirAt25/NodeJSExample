const db = require('../config/database')
const Event = require('../models/Event')

let newEvents = [

    new Event({
            title : 'Event 1',
            description : 'this is a test event on Event1',
            location : 'Tunisia1',
            date : Date.now(),
            created_at : Date.now()
    }),
    new Event({
            title : 'Event 2',
            description : 'this is a test event on Event2',
            location : 'Tunisia2',
            date : Date.now(),
            created_at : Date.now()
    }),
    new Event({
            title : 'Event 3',
            description : 'this is a test event on Event3',
            location : 'Tunisia3',
            date : Date.now(),
            created_at : Date.now()
    }),
    new Event({
            title : 'Event 4',
            description : 'this is a test event on Event4',
            location : 'Tunisia4',
            date : Date.now(),
            created_at : Date.now()
    }),
    new Event({
            title : 'Event 5',
            description : 'this is a test event on Event5',
            location : 'Tunisia5',
            date : Date.now(),
            created_at : Date.now()
    }),
    new Event({
            title : 'Event 6',
            description : 'this is a test event on Event6',
            location : 'Tunisia6',
            date : Date.now(),
            created_at : Date.now()
    }),
    new Event({
            title : 'Event 7',
            description : 'this is a test event on Event7',
            location : 'Tunisia7',
            date : Date.now(),
            created_at : Date.now()
    }),
    new Event({
            title : 'Event 8',
            description : 'this is a test event on Event8',
            location : 'Tunisia8',
            date : Date.now(),
            created_at : Date.now()
    }),
    new Event({
            title : 'Event 9',
            description : 'this is a test event on Event9',
            location : 'Tunisia9',
            date : Date.now(),
            created_at : Date.now()
    })
    
    
]

newEvents.forEach ((event)=>{
    event.save ( (err)=>{
        if (err){
            console.log(err);
        }
        else {
            console.log(event.title+" Added Succesfully ");
        }
    })
})
// let newEvent = new Event({
//     title : 'This is Event 15',
//     description : 'this is a test event on Event15',
//     location : 'Tunisia15',
//     date : Date.now(),
//     created_at : Date.now()
// })

// newEvent.save ( (err)=>{
//     if (!err){
//         console.log("record was added");
//     } else {
//         console.log(err);
//     }
// })
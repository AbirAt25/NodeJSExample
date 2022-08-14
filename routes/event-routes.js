const { render } = require('ejs')
const express = require('express')
const router = express.Router()
const Event = require("../models/Event")
const { check, validationResult } = require('express-validator')

//route home events
router.get('/', (req,res) => {
    Event.find({},(err,events) => {
      //  res.json(events)
      let chunk = []
      let chunkSize = 3
      for (let i =0 ; i < events.length ; i+=chunkSize) {
          chunk.push(events.slice( i, chunkSize + i))
      }
      
    // res.json(chunk)
    res.render('event/index', {
        chunk:chunk,
        successMsg:req.flash('successMsg')
        
    })
    
    })
    
})
// create Event 
router.get('/create' , (req,res) => {
    res.render('event/create' , {
        errors:req.flash('errors')
    })
})

router.post('/create',[
    check('title').isLength({min :5}).withMessage('Title should be more than 5 caracters'),
    check('description').isLength({min: 5}).withMessage('Description should be more than 5 char'),
    check('location').isLength({min: 3}).withMessage('Location should be more than 5 char'),
    check('date').isLength({min: 5}).withMessage('Date should valid Date'),

], (req,res)=> {

    const errors = validationResult(req)

    if (! errors.isEmpty()){
        req.flash('errors',errors.array())
        //res.json(errors.array())
        res.redirect('/events/create',)
    }
    else {
       // res.json("ok")
       let newEvent = new Event({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        location: req.body.location,
        created_at: Date.now()
    })

    newEvent.save( (err)=> {
        if(!err) {
            console.log('event was added')
            req.flash('successMsg', "Event Ajouted Succefully")
            res.redirect('/events')
        } else {
            console.log(err)
        }
    })
}
   
})
 
//show single event
router.get('/:id', (req,res) => {
    Event.findById((req.params.id), (err,eventResult)=> {
        
        if(!err) {
            
         res.render('event/show', {
             event: eventResult
         })
 
        } else {
            console.log(err)
        }
    
    })
})





module.exports = router
const { render } = require('ejs')
const express = require('express')
const router = express.Router()
const Event = require("../models/Event")
const { check, validationResult } = require('express-validator')
const moment = require('moment'); // require
const { query } = require('express')
const { Query } = require('mongoose')
moment().format(); 

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

// edit route 

router.get('/edit/:id', (req,res) => {
    Event.findOne({_id:req.params.id},(err,event)=>{
        if(!err){
            res.render('event/edit', {
                event:event,
                eventDate: moment(event.date).format('YYYY-MM-DD'),
                errors: req.flash('errors'),
                successMsg : req.flash('successMsg')
            })
        }
        else{
            console.log(err)
        }
    })
})
 // update event

 router.post('/update',[

    check('title').isLength({min :5}).withMessage('Title should be more than 5 caracters'),
    check('description').isLength({min: 5}).withMessage('Description should be more than 5 char'),
    check('location').isLength({min: 3}).withMessage('Location should be more than 5 char'),
    check('date').isLength({min: 5}).withMessage('Date should valid Date'),

] , (req,res)=> {
    const errors = validationResult(req)

    if (! errors.isEmpty()){
        req.flash('errors',errors.array())
        //res.json(errors.array())
        res.redirect('/events/edit/'+ req.body.id)
    }
    else {
// create object 

        let newfeilds = {
           title: req.body.title,
           description: req.body.description,
           location: req.body.location,
           date: req.body.date
        }
        let query = {_id: req.body.id}
        Event.updateOne(query, newfeilds, (err)=> {
            if(!err) {
                req.flash('successMsg', " The event was updated successfuly"),
                res.redirect('/events/edit/' + req.body.id)
            } else {
                console.log(err)
            }
        })
     }
})



module.exports = router
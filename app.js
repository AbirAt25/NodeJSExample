const express = require('express')
const app = express()

//connect to Database
const db = require('./config/database')
// bring EJS Template

app.set('view engine','ejs')

// bring static folder

app.use(express.static('public'))
app.use(express.static('node_modules'))


app.get('/',  (req, res) =>{
    res.send('Hello Nidhal')
  })


// bring events routes
const events = require("./routes/event-routes.js")


app.use('/events', events)


  // port 3000
  app.listen(3000, () => {
    console.log("app is working on http://localhost:3000/")
  })
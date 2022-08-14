const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')



// Bring bodyParser : which get automaticly the data from a form fields
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//connect to Database
const db = require('./config/database')
// bring EJS Template

app.set('view engine','ejs')

// bring static folder

app.use(express.static('public'))
app.use(express.static('node_modules'))

//Session & Flash config 

app.use(session({
  secret: 'nidhal secrets',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 * 15 }
})
)

app.use(flash())

app.get('/',  (req, res) =>{
    res.send('Hello Nidhal ! Please Click <a href="events">Here</a>')
  })


// bring events routes
const events = require("./routes/event-routes.js")


app.use('/events', events)


  // port 3000
  app.listen(3000, () => {
    console.log("app is working on http://localhost:3000/")
  })
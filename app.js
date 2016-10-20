var express = require('express')
var app = express()
var layout = require('express-ejs-layouts')
var bodyParser = require('body-parser')
var flash = require('connect-flash')
var session = require('express-session')
var passport = require('passport')


var dotenv = require('dotenv')

var mongoose = require('mongoose')
mongoose.Promise = global.Promise

console.log('the environment is on ' + process.env.NODE_ENV)

dotenv.load({ path: '.env.' + process.env.NODE_ENV })
mongoose.connect(process.env.MONGO_URI)

app.use(bodyParser.json()) // to parse ajax json req
app.use(bodyParser.urlencoded({
  extended: true
}))
app.set('view engine', 'ejs')
app.use(layout)
app.use(session({
  secret: process.env.EXPRESS_SECRET,
  resave: true,
  saveUninitialized: true
}))
app.use(flash())
// app.use(session({}))

app.use(passport.initialize())
app.use(passport.session())

// serve static files
app.use(express.static(__dirname + '/public'))

var frontendRoutes = require('./routes/users')
var ajaxRoutes = require('./routes/users_api')

app.use('/users', frontendRoutes) // only render ejs files
app.use('/api/users', ajaxRoutes) // only handle ajax request

app.listen(process.env.PORT || 3000)

console.log('Server started')

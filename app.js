var express = require('express')
var app = express()
var layout = require('express-ejs-layouts')
var bodyParser = require('body-parser')

var mongoose = require('mongoose')
mongoose.Promise = global.Promise

console.log('the environment is on ' + process.env.NODE_ENV)

if (process.env.NODE_ENV === 'production') {
  mongoose.connect('mongodb://juliancwt77:Barney25@ds061308.mlab.com:61308/job-search')
} else {
  mongoose.connect('mongodb://localhost/Job-search')
}
app.use(bodyParser.json()) // to parse ajax json req
app.use(bodyParser.urlencoded({
  extended: true
}))
app.set('view engine', 'ejs')
app.use(layout)

// serve static files
app.use(express.static(__dirname + '/public'))

// var frontendRoutes = require('./routes/users')
// var ajaxRoutes = require('./routes/users_api')

// app.use('/users', frontendRoutes) // only render ejs files
// app.use('/api/users', ajaxRoutes) // only handle ajax request

app.listen(process.env.PORT || 3000)

console.log('Server started')

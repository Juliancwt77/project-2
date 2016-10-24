var express = require('express')
var router = express.Router()
var passport = require('passport')
var Job = require('../models/job')
var Recruiter = require('../models/recruiter')

// router.get('/', function (req, res) {
//   User.find({}, function (err, allUsers) {
//     console.log(allUsers)
//     res.render('users/index', {
//       allUsers: allUsers
//     })
//   })
// })
router.get('/signup', function (req, res) {
  res.render('users/signup')
})

// router.post('/', function (req, res) {
//   // res.json(req.body)
//   User.create(req.body.user, function (err, savedUser) {
//     console.log('new user created')
//     res.json(savedUser)
//   })
// })

router.get('/', function (req, res) {
  res.render('users/recruiter')
})

router.get('/login', function (req, res) {
  res.render('users/login')
})

router.get('/admin', function (req, res) {
  res.render('users/admin')
})

module.exports = router

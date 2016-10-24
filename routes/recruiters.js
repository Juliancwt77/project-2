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

router.get('/', function (req, res) {
  res.render('users/recruiter')
})

router.get('/login', function (req, res) {
  res.render('users/login')
})

router.get('/admin', function (req, res) {
  res.render('users/admin')
})

router.post('/admin', function (req, res) {
  Job.create(req.body.job, function (err, task) {
    if (err) {
      res.send('an err during creation' + err)
    } else {
      // res.redirect('/profile')
      res.send('successful')
    // res.redirect('/')
    }
  })
})

module.exports = router

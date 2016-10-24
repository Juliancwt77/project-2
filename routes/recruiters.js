var express = require('express')
var router = express.Router()

var Company = require('../models/recruiter')

router.get('/', function (req, res) {
  User.find({}, function (err, allUsers) {
    console.log(allUsers)
    res.render('users/index', {
      allUsers: allUsers
    })
  })
})
router.get('/signup', function (req, res) {
  res.render('users/signup')
})
module.exports = router

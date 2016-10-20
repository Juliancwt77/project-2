var express = require('express')
var router = express.Router()

var User = require('../models/user')

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

router.post('/profile', function (req, res) {
  User.create(req.body.user, function (err, newUser) {
    // res.send('profile')
    res.send(req.body)

  })
})


module.exports = router

var express = require('express')
var router = express.Router()
var passport = require('passport')
var User = require('../models/user')
var Admin = require('../models/admin')

// router.get('/profile', function (req, res) {
//   User.find({}, function (err, allUsers) {
//     console.log(allUsers)
//     res.render('users/profile', {
//       allUsers: allUsers
//     })
//   })
// })

router.get('/signup', function (req, res) {
  res.render('users/signup')
})

router.get('/profile', function (req, res) {
  res.render('users/profile')
})

router.get('/adminlogin', function (req, res) {
  res.render('users/adminlogin')
})

router.get('/admin', function (req, res) {
  res.render('users/admin')
})

router.post('/signup',
  passport.authenticate('local-signup', {
    successRedirect: '/users/profile',
    failureRedirect: '/test',
    failureFlash: true

   }))
  // router.post('/profile', function (req, res) {
  //   User.create(req.body.user, function (err, newUser) {
  //     // res.send('profile')
  //     res.send(req.body)//

//   })
  // })

router.get('/', function (req, res) {
  res.render('users/index', {
    message: req.flash('loginMessage')
  })
})

router.post('/', function (req, res) {
  var user = req.body.user

  User.findOne({ 'local.email': user.local.email }, function (err, foundUser) {
    if (err) res.send(err.message)

    if (foundUser) {
      foundUser.authenticate(user.local.password, function (err, authenticated) {
        if (err) res.send(err)

        if (authenticated) {
          req.flash('loginMessage', 'Successful login!')
          res.redirect('users/profile')
        // res.send('user name found')
        } else {
          // res.redirect('/error')
          // res.send('user name not found')
          req.flash('loginMessage', 'Password is wrong!')
          res.redirect('/users')
        }
      })
    } else {
      req.flash('loginMessage', 'Email not found!')
      res.redirect('/users')
    }
  })
})

// router.get('/error', function (req, res) {
//   res.render('users/error')
// })
//
// router.get('/profile', function (req, res) {
//   res.render('users/profile')
// })

module.exports = router

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

function authCheck (req, res, next) {
  if (req.isAuthenticated()) {
    req.flash('signupMessage', 'You have signed up')
    return res.redirect('/recruiters/admin')
  } else {
    return next()
  }
}

router.get('/', authCheck, function (req, res) {
  res.render('users/recruiter', { message: req.flash('signupMessage')
  })
})

router.post('/',
  passport.authenticate('recruiter-signup', {
    successRedirect: '/recruiters/admin',
    failureRedirect: '/recruiters',
    failureFlash: true

  }))

router.get('/login', function (req, res) {
  res.render('users/login', {
    message: req.flash('loginMessage')
  })
})

router.post('/login', passport.authenticate('recruiter-login', {
  successRedirect: '/recruiters/admin',
  failureRedirect: '/recruiters/login',
  failureFlash: true
}))

// router.get('/admin', function (req, res) {
//   res.render('users/admin')
// })

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
router.get('/admin/posting', function (req, res) {
  Job.find({}, function (err, allJobs) {
    console.log(allJobs)
    res.render('users/posting', {
      allJobs: allJobs

    })
  })
})
//
router.get('/admin', function (req, res) {
  res.render('users/admin', { recruiter: req.user })
// res.render({ message: req.flash('loginMessage')
// })
})

router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/users')
})

function isLoggedIn (req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next()
  // if they aren't redirect them to the home page
  res.redirect('/users')
}

module.exports = router

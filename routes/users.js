var express = require('express')
var router = express.Router()
var passport = require('passport')
var User = require('../models/user')
var Listing = require('../models/listing')
var Job = require('../models/job')

function authCheck (req, res, next) {
  if (req.isAuthenticated()) {
    req.flash('signupMessage', 'You have signed up')
    return res.redirect('/users/profile')
  } else {
    return next()
  }
}

// router.get('/profile', function (req, res) {
//   User.find({}, function (err, allUsers) {
//     console.log(allUsers)
//     res.render('users/profile', {
//       allUsers: allUsers
//     })
//   })
// })

// router.route('/signup')
//       .get(authCheck, function (req, res) {
//         res.render('users/signup')
//         message: req.flash('signupMessage')
//       })
router.get('/users/signup', authCheck, function (req, res) {
  res.render('users/signup', { message: req.flash('signupMessage')

  })
})

router.post('/users/signup',
  passport.authenticate('local-signup', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/signup',
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

router.post('/', passport.authenticate('local-login', {
  successRedirect: '/users/profile',
  failureRedirect: '/',
  failureFlash: true
}))

router.get('/users/profile', isLoggedIn, function (req, res) {
  res.render('users/profile', { user: req.user })
  // res.render({ message: req.flash('loginMessage')
  // })

})

// router.get('/users/profile/listing', isLoggedIn, function (req, res) {
//   // res.render({ message: req.flash('loginMessage')
//   Job.find({ recruiter: req.params.id }, function (err, allListing) {
//     //   console.log(allJobs)
//     res.render('users/listing', {
//       allListing: allListing
//
//     })
//   })
// })

router.get('/users/profile/listing', isLoggedIn, function (req, res) {
  Job.find()
    .populate('local.recruiter')
    .exec(function (err, allListing) {
      if (err) console.error(err)
      // console.log('listings', allListing)
      res.render('users/listing', {
        allListing: allListing

      }

      )
    })
})

router.post('/users/profile/listing', isLoggedIn, function (req, res) {
  // res.send(req.user)
  User.findOneAndUpdate(
    {_id: req.user.id },
    {$push: { 'local.jobsapplied': req.body.jobid} },
    {safe: true, upsert: true, new: true},
    function (err, user) {
      // res.send(user)

      Job.findOneAndUpdate(
        {_id: req.body.jobid },
        {$push: { 'local.candidate': req.user.id } },
        {safe: true, upsert: true, new: true},
        function (err, model) {
          // res.send(job)
          if (err) console.log('ERROR', err)

          res.redirect('/users/profile/listing')
        }
      )
    }
  )
})

router.get('/users/profile/application', isLoggedIn, function (req, res) {
  Job.find({ 'local.candidate': req.user.id }, function (err, appJob) {

    res.render('users/application', {
      appJob: appJob

    })
  })
})

// router.get('/users/profile/application', isLoggedIn, function (req, res) {
//   Job.find({ 'local.candiate': req.user.id })
//     .populate('local.candiate.id')
//     .exec(function (err, appJob) {
//       if (err) console.error(err)
//       // console.log('listings', allListing)
//       res.render('users/application', {
//         appJob: appJob
//
//       }
//
//       )
//     })
// })

router.get('/users/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

function isLoggedIn (req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next()

  // if they aren't redirect them to the home page
  res.redirect('/')
}
module.exports = router

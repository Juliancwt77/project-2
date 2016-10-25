var express = require('express')
var router = express.Router()
var passport = require('passport')
var User = require('../models/user')
var Listing = require('../models/listing')

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

// router.post('/', function (req, res) {
//   var user = req.body.user
//
//   User.findOne({ 'local.email': user.local.email }, function (err, foundUser) {
//     if (err) res.send(err.message)
//
//     if (foundUser) {
//       foundUser.authenticate(user.local.password, function (err, authenticated) {
//         if (err) res.send(err)
//
//         if (authenticated) {
//           req.flash('loginMessage', 'Successful login!')
//           res.redirect('users/profile')
//         // res.send('user name found')
//         } else {
//           // res.redirect('/error')
//           // res.send('user name not found')
//           req.flash('loginMessage', 'Password is wrong!')
//           res.redirect('/users')
//         }
//       })
//     } else {
//       req.flash('loginMessage', 'Email not found!')
//       res.redirect('/users')
//     }
//   })
// })

// router.get('/error', function (req, res) {
//   res.render('users/error')
// })
//
router.get('/users/profile', isLoggedIn, function (req, res) {
  res.render('users/profile', { user: req.user })
  // res.render({ message: req.flash('loginMessage')
  // })

})

router.get('/users/profile/listing', isLoggedIn, function (req, res) {
  // res.render({ message: req.flash('loginMessage')
  Listing.find({}, function (err, allListing) {
    //   console.log(allJobs)
    res.render('users/listing', {
      allListing: allListing

    })
  })
})

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

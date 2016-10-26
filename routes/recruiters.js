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

router.get('/recruiters', authCheck, function (req, res) {
  res.render('users/recruiter', { message: req.flash('signupMessage')
  })
})

router.post('/recruiters',
  passport.authenticate('recruiter-signup', {
    successRedirect: '/recruiters/admin',
    failureRedirect: '/recruiters',
    failureFlash: true

  }))

router.get('/recruiters/login', function (req, res) {
  res.render('users/login', {
    message: req.flash('loginMessage')
  })
})

router.post('/recruiters/login', passport.authenticate('recruiter-login', {
  successRedirect: '/recruiters/admin',
  failureRedirect: '/recruiters/login',
  failureFlash: true
}))

// router.get('/admin', function (req, res) {
//   res.render('users/admin')
// })

router.post('/recruiters/admin', function (req, res) {
  Job.create(req.body.job, function (err, task) {
    if (err) {
      res.send('an err during creation' + err)
    } else {
      // res.redirect('/users/posting')
      // res.send('successful')
    res.redirect('/recruiters/posting')
    }
  })
})

//
router.get('/recruiters/admin', function (req, res) {
  res.render('users/admin', { recruiter: req.user })
// res.render({ message: req.flash('loginMessage')
// })
})

router.get('/recruiters/posting', isLoggedIn, function (req, res) {
  Job.find({ 'local.recruiter': req.user }, function (err, allJobs) {
    //   console.log(allJobs)
    res.render('users/posting', {
      allJobs: allJobs

    })
  })
})

router.get('/recruiters/posting/:id/edit', isLoggedIn, function (req, res) {
  Job.findById(req.params.id , function (err, allJobs) {
    //   console.log(allJobs)
    res.render('users/edit', {
      allJobs: allJobs

    })
  })
})

router.post('/recruiters/posting/:id/edit', isLoggedIn, function (req, res) {
  Job.findById(req.params.id , function (err, oneJob) {
    if (err) {
      res.render('users/edit')
    }else {
      oneJob.local.title = req.body.job.local.title,
      oneJob.local.salary = req.body.job.local.salary
      oneJob.local.description = req.body.job.local.description
      oneJob.save(function (err, newerJob) {
        res.redirect('/recruiters/posting')
      })
    }
  })
})

router.delete('/recruiters/posting/:id', function (req, res) {
  Job.findByIdAndRemove(req.params.id, function (err, allJobs) {
    if (err) {
      console.log(err)
      res.render('users/posting')
    } else {
      res.redirect('/recruiters/posting')
    }
  })
})

router.get('/logout', function (req, res) {
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

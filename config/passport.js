var LocalStrategy = require('passport-local').Strategy

var User = require('../models/user')
var Recruiter = require('../models/recruiter')

module.exports = function (passport) {
  function isUser (id) {
    User.findById(id, function (err, foundUser) {
      if (foundUser) return true

      return false
    })
  }

  passport.serializeUser(function (user, done) {
    console.log('serialized user is', user)
    done(null, user.id)
  })

  passport.deserializeUser(function (id, done) {
    console.log('isUser is', isUser(id), id)
    User.findById(id, function (err, user) {
      if(user) {
        done(err, user)
      } else {
        Recruiter.findById(id, function (err, user) {
          done(err, user)
        })
      }
    })
  })
  // for candidate
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'user[local][email]',
    passwordField: 'user[local][password]',
    passReqToCallback: true

  }, function (req, email, password, next) {
    // the authentication
    process.nextTick(function () {
      User.findOne({ 'local.email': email }, function (err, founduser) {

        // if user is found, don't create new user
        // if user is not found, create new user
        if (err) return next(err)

        if (founduser) {
          return next(null, false, req.flash('signupMessage', 'Email has been taken')
          )
        } else {
          // console.log(req.body)
          var newUser = new User({
            local: {
              name: req.body.user.local.name,
              email: email,
              contact: req.body.user.local.contact,
              education: req.body.user.local.education,
              experience: req.body.user.local.experience,
              password: password

            }
          })

          newUser.save(function (err, newUser) {
            if (err) throw err

            return next(null, newUser)
          })
        }
      })
    })
  }))

  passport.use('local-login', new LocalStrategy({
    usernameField: 'user[local][email]',
    passwordField: 'user[local][password]',
    passReqToCallback: true
  }, function (req, email, password, next) {
    console.log('authenticating with given email and password')
    console.log(email, password)

    User.findOne({ 'local.email': email }, function (err, foundUser) {
      if (err) return next(err)

      // if cannot find use by email, return to route with flash message
      if (!foundUser)
        return next(null, false, req.flash('loginMessage', 'No user found with this email'))

      foundUser.auth(password, function (err, authenticated) {
        if (err) return next(err)

        if (authenticated) {
          return next(null, foundUser, req.flash('loginMessage', 'Successful login! ' + foundUser.local.name))
        } else {
          return next(null, false, req.flash('loginMessage', "Password don't match"))
        }
      })
    })
  }))

  // for recruiter
  passport.use('recruiter-signup', new LocalStrategy({
    usernameField: 'recruiter[local][email]',
    passwordField: 'recruiter[local][password]',
    passReqToCallback: true

  }, function (req, email, password, next) {
    // the authentication
    process.nextTick(function () {
      Recruiter.findOne({ 'local.email': email }, function (err, founduser) {

        // if user is found, don't create new user
        // if user is not found, create new user
        if (err) return next(err)

        if (founduser) {
          return next(null, false, req.flash('signupMessage', 'Email has been taken')
          )
        } else {
          // console.log(req.body)
          var newRecruiter = new Recruiter({
            local: {
              company: req.body.recruiter.local.company,

              name: req.body.recruiter.local.name,

              email: email,

              contact: req.body.recruiter.local.contact,

              sector: req.body.recruiter.local.sector,

              password: password

            }
          })

          newRecruiter.save(function (err, newRecruiter) {
            if (err) throw err

            return next(null, newRecruiter)
          })
        }
      })
    })
  }))

  passport.use('recruiter-login', new LocalStrategy({
    usernameField: 'recruiter[local][email]',
    passwordField: 'recruiter[local][password]',
    passReqToCallback: true
  }, function (req, email, password, next) {
    console.log('authenticating with given email and password')
    console.log(email, password)

    Recruiter.findOne({ 'local.email': email }, function (err, foundUser) {
      if (err) return next(err)

      // if cannot find use by email, return to route with flash message
      if (!foundUser)
        return next(null, false, req.flash('loginMessage', 'No user found with this email'))

      foundUser.auth(password, function (err, authenticated) {
        if (err) return next(err)

        if (authenticated) {
          return next(null, foundUser, req.flash('loginMessage', 'Successful login! ' + foundUser.local.name))
        } else {
          return next(null, false, req.flash('loginMessage', "Password don't match"))
        }
      })
    })
  }))
}

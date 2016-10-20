var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

var User = require('../models/user')

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function (id, done) {
    User.findbyID(id, function (err, user) {
      done(err, user)
    })
  })

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallbacl: true

  }, function (req, email, password, next) {
    // the authentication
    User.findOne({ 'local.email': email }, function (err, user) {

      // if user is found, don't create new user
      // if user is not found, create new user
      if (err) return next(err)

      if (user) {
        return next(null, false, req.flash('signupMessage', 'Email has been taken')
        )
      } else {
        var newUser = new User({
          local: {
            email: email,
            password: password
          }
        })

        newUser.save(function (err, newUser) {
          if (err) throw err

          return next(null, newUser)
        })
      }
    })
  }))
}

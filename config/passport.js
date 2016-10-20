var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

var User = require('../models/user')

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findbyID(id, function (err, user) {
    done(err, user)
  })
})

passport.use('local-signup', new LocalStrategy ( {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallbacl: true

}, function (req, email, password, next) {
  // the authentication 

}


})

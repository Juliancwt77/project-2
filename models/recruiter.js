var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var Job = require('../models/job')
var Recruiter = require('../models/listing')

var recruiterSchema = new mongoose.Schema({
  local: {
    company: {
      type: String,
      required: true
    },

    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    contact: {
      type: Number,
      required: true
    },
    sector: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  }
})

recruiterSchema.pre('save', function (next) {
  console.log('before save hash the password')
  console.log(this)

  var user = this

  bcrypt.genSalt(5, function (err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.local.password, salt, function (err, hash) {
      if (err) return next(err)

      user.local.password = hash
      console.log('after hash')
      console.log(user)
      next()
    })
  })
})

recruiterSchema.post('save', function () {
  // console.log('after the save, save successful')
})

recruiterSchema.methods.auth = function (givenPassword, callback) {
  console.log('given password is ' + givenPassword)
  console.log('saved password is ' + this.local.password)
  var hashedPassword = this.local.password

  bcrypt.compare(givenPassword, hashedPassword, function (err, isMatch) {
    callback(err, isMatch)
  })
}

var Recruiter = mongoose.model('Recruiter', recruiterSchema)

module.exports = Recruiter

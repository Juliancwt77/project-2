var mongoose = require('mongoose')
var bcrypt = require('bcrypt')

var userSchema = new mongoose.Schema({
  local: { name: {
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
    education: {
      type: String,
      required: true
    },
    experience: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },

    // jobsapplied: {
    //
    //   type: String
    // }

    jobsapplied: [{

      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]

  }
})

userSchema.pre('save', function (next) {
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

userSchema.post('save', function () {
  // console.log('after the save, save successful')
})

userSchema.methods.auth = function (givenPassword, callback) {
  console.log('given password is ' + givenPassword)
  console.log('saved password is ' + this.local.password)
  var hashedPassword = this.local.password

  bcrypt.compare(givenPassword, hashedPassword, function (err, isMatch) {
    callback(err, isMatch)
  })
}

var User = mongoose.model('User', userSchema)

module.exports = User

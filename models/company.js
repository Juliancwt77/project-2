var mongoose = require('mongoose')
var bcrypt = require('bcrypt')

var companySchema = new mongoose.Schema({
  local: { name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    'contact no': {
      type: Number,
      required: true
    },
    'education level': {
      type: String,
      required: true
    },
    'total work experience': {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  }
})

companySchema.pre('save', function (next) {
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

companySchema.post('save', function () {
  // console.log('after the save, save successful')
})

var Company = mongoose.model('Company', companySchema)

module.exports = Company

var mongoose = require('mongoose')

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

var Recruiter = mongoose.model('Recruiter', recruiterSchema)

module.exports = Recruiter

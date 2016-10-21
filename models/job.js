var mongoose = require('mongoose')

var jobSchema = new mongoose.Schema({
  'company-name': {
    type: String,
    required: true
  },

  'job-title': {
    type: String,
    required: true
  },

  sector: {
    type: String,
    required: true
  },

  salary: {
    type: Number,
    required: true
  }

})

var Job = mongoose.model('Job', companySchema)

module.exports = Job

var mongoose = require('mongoose')

var Recruiter = require('../models/recruiter')

var jobSchema = new mongoose.Schema({
  local: {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recruiter'
    },

    //
    // sector: {
    //   type: String,
    //   required: true
    // },

    title: {
      type: String,
      required: true
    },

    salary: {
      type: Number,
      required: true
    },

    description: {
      type: String,
      required: true
    }
  }
})

var Job = mongoose.model('Job', jobSchema)

module.exports = Job

var mongoose = require('mongoose')

var Recruiter = require('../models/recruiter')
var Listing = require('../models/listing')

var date = require('date-and-time')

var now = new Date()

date.format(now, 'ddd MMM DD YYYY')

// var Recruiter = require('../models/listing')

var jobSchema = new mongoose.Schema({
  local: {

    // tags: { type: [String], index: true },

    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recruiter'
    },

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
    },
    created: {
      type: Date,
      default: Date.now
    },
    updated: {
      type: Date,
      default: Date.now

    },

    candidate: [{

      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]

  }
})

var Job = mongoose.model('Job', jobSchema)

module.exports = Job

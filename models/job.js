var mongoose = require('mongoose')

var Recruiter = require('../models/recruiter')
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

  }

  }
})

jobSchema.index({ name: 1, type: -1 });

var Job = mongoose.model('Job', jobSchema)

module.exports = Job

var mongoose = require('mongoose')

var Recruiter = require('../models/recruiter')
var Recruiter = require('../models/listing')

var jobSchema = new mongoose.Schema({
  local: {

    // tags: { type: [String], index: true },

    recruiter: {
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

jobSchema.index({ name: 1, type: -1 });

var Job = mongoose.model('Job', jobSchema)

module.exports = Job

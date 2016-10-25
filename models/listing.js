var mongoose = require('mongoose')

var Recruiter = require('../models/recruiter')
var Recruiter = require('../models/job')

var listingSchema = new mongoose.Schema({
  local: {

    // tags: { type: [String], index: true },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job'
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

var Listing = mongoose.model('Listing', listingSchema)

module.exports = Listing

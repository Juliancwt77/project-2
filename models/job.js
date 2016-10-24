var mongoose = require('mongoose')

var jobSchema = new mongoose.Schema({
  local: {

    // 'company-name': {
    //   type: String,
    //   required: true
    // },
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

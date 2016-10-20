var mongoose = require('mongoose')

var companySchema = new mongoose.Schema({
  'company-name': {
    type: String,
    required: true
  },

  'person-in-charge': {
    type: String,
    required: true
  },
  'company-email': {
    type: String,
    required: true
  },
  'conmpany-contact-no': {
    type: Number,
    required: true
  },
  sector: {
    type: String,
    required: true
  }

})

var Company = mongoose.model('Company', companySchema)

module.exports = Company

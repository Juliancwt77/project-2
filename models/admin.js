var mongoose = require('mongoose')

var adminSchema = new mongoose.Schema({
  adminemail: {
    type: String,
    required: true
  },

  adminpassword: {
    type: String,
    required: true
  }

})

var Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin

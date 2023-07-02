const mongoose = require('mongoose');

const StaffSchema = mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  surname: {
    type: String,
  },
  qualification: {
    type: String,
  },
  gender: {
    type: String,
  },
  maritalStaus: {
    type: String,
  },
  dob: {
    type: String,
  },
  yearAdmitted: {
    type: String,
  },
  role: {
    type: String,
  },
  stateOfOrigin: {
    type: String,
  },
  localGvt: {
    type: String,
  },
  homeTown: {
    type: String,
  },
  residence: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
},{
  timestamps: true
});

module.exports = mongoose.model('Staff', StaffSchema);

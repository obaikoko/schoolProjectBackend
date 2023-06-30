const mongoose = require('mongoose');

const TeacherSchema = mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  surname: {
    type: String,
  },
  class: {
    type: String,
  },
  age: {
    type: String,
  },
});

module.exports = mongoose.model('Teacher', TeacherSchema);

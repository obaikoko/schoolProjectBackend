const mongoose = require('mongoose')

const StudentSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    surname: {
      type: String,
    },
    age: {
      type: String,
    },
    class: {
      type: String,
      enum: ['Jss1', 'Jss2', 'Jss3', 'Sss1', 'Sss2', 'Sss3'],
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
    },
    yearAdmitted: {
      type: String,
    },

    stateOfOrigin: {
      type: String,
    },
    localGvt: {
      type: String,
    },

    image: {
      url: {
        type: String,
      },
      publicId: {
        type: String,
      },
    },
    sponsorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sponsor',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Student', StudentSchema)
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
    dob: {
      type: String,
    },
    level: {
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
    homeTown: {
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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Student', StudentSchema)
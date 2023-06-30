const mongoose = require('mongoose');

const SponsorSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    occupation: {
      type: String,
    },
    relationship: {
      type: String,
    },
    address: {
      type: String,
    },
    studentIds: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
    }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Sponsor', SponsorSchema);

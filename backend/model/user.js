const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
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
    stateOfOrigin: {
      type: String,
    },
    localGvt: {
      type: String,
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      enum: ['Admin', 'User']
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please add an email'],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', UserSchema);

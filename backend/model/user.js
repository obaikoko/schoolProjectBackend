const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      require: [true, 'please add an email'],
      unique: true
    },
    password: {
      type: String,
      require: [true, 'please add a password'],
    },
    role: {
      type: String,
      enum: ['Admin', 'Agent'],
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model('User', UserSchema);

const asyncHandler = require('express-async-handler');
const User = require('../model/user');
const generateToken = require('../utils/generateToken');

// Authenticate Users
// @route POST api/user/auth
// privacy Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('Add email or password');
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error('User does not exist');
  }
  if (user && (await user.matchPassword(password))) {
    res.status(200);
    generateToken(res, user._id);
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error('Invalid Email or Password');
  }
});

// Updates Logout User
// @route POST api/users/profile/:id
// privacy Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expiresIn: new Date(0),
  });

  res.status(200);
  res.json({ message: 'Logged out user' });
});

module.exports = {
  authUser,
  logoutUser,
};

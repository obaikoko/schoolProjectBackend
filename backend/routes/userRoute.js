const { authUser, logoutUser } = require('../controller/userController');

const express = require('express');

const router = express.Router();

router.post('/auth', authUser);
router.post('/logout', logoutUser);

module.exports = router;

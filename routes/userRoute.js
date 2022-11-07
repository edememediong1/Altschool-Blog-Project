const express = require('express');
const userRoute = express.Router();
const {signup, login} = require('../controller/userController');
const {addUserValidationMW} = require('../middleware/validation');


userRoute.post('/signup', addUserValidationMW, signup);
userRoute.post('/login', login)


module.exports = userRoute
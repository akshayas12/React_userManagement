const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const protect = require('../middleware/authMiddleware');
const upload=require('../middleware/multerMiddleware')
router.post('/signup', userController.postSignup);
router.post('/login', (req, res, next) => {
    console.log('Login route hit');
    next();
  }, userController.postLogin);
  // router.post('/profile-image', protect, upload, userController.uploadProfileImage);

module.exports = router;

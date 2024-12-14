// const express = require('express');
// const router = express.Router();
// const adminController= require('../controller/adminController');
// const { protect, admin } = require('../middleware/authMiddleware');

// // Admin login route
// router.post('/adminlogin', adminController.adminLogin);


// router.get('/users', protect, admin, adminController.getAllUsers);
// router.post('/add-user', protect, admin, adminController.createUser);
// router.delete('/users/:id', protect, admin, adminController.deleteUser);
// router.put('/users/:id', protect, admin, adminController.updateUser);

// module.exports = router;


const express = require('express');
const router = express.Router();
const adminController= require('../controller/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

// Admin login route
router.post('/adminlogin', adminController.adminLogin);

// User management routes
router.get('/users', protect, admin, adminController.getAllUsers);
router.post('/users', protect, admin, adminController.createUser); 
router.delete('/users/:id', protect, admin, adminController.deleteUser);
router.put('/users/:id', protect, admin, adminController.updateUser);

module.exports = router;

// backend/routes/userRoutes.js

const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const {authenticateUser} = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/profile', authenticateUser, getUserProfile);
router.put('/profile', authenticateUser, updateUserProfile);

module.exports = router;

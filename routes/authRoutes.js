// backend/routes/authRoutes.js

const express = require('express');
const { signup, login, logout } = require('../controllers/userController');
const { validateSignup } = require('../middlewares/authValidator');
const fieldConfig = require('../config/fieldConfig');

const router = express.Router();

router.post('/signup', validateSignup, signup);
router.post('/login', login);
router.post('/logout', logout);

router.get('/field-config/:role', (req, res) => {
  const { role } = req.params;
  const config = fieldConfig[role];
  if (!config) return res.status(404).json({ message: 'Rôle non valide' });
  res.status(200).json(config);
});

module.exports = router;

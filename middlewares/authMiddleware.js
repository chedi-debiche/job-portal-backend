// backend/middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware d'authentification pour vérifier la présence et la validité du token
const authenticateUser = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'Token requis' });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id); // Recherche l'utilisateur complet dans la base de données
      if (!user) return res.status(401).json({ message: 'Utilisateur non trouvé' });
  
      req.user = { id: user._id, role: user.role }; // Assure-toi que req.user contient l'ID et le rôle
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token invalide' });
    }
  };
  

// Middleware pour autoriser uniquement les recruteurs
const authorizeRecruiter = (req, res, next) => {
    console.log("Role in authorizeRecruiter:", req.user.role); // Vérifie la valeur du rôle

  if (req.user.role === 'recruteur' || req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Accès réservé aux recruteurs et administrateurs' });
};

// Middleware pour autoriser uniquement les administrateurs
const authorizeAdmin = (req, res, next) => {
  if (req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Accès réservé aux administrateurs' });
};

module.exports = {
  authenticateUser,
  authorizeRecruiter,
  authorizeAdmin,
};

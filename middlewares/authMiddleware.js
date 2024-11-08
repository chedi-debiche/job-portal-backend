// backend/middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Extraire le token après le mot 'Bearer '
  const token = req.headers['authorization']?.split(' ')[1]; 
  if (!token) return res.status(403).json({ message: 'Token requis' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide' });
  }
};

module.exports = verifyToken;

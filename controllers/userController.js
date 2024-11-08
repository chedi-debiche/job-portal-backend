// backend/controllers/userController.js

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { username, email, password, role, phone, location, skills, experience, linkedin, cv, companyName, website, logo, companyDescription, contactName } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email déjà utilisé' });

    const newUser = new User({
      username,
      email,
      password,
      role,
      phone,
      location,
      skills,
      experience,
      linkedin,
      cv,
      companyName,
      website,
      logo,
      companyDescription,
      contactName,
    });

    await newUser.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur de serveur', error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Mot de passe incorrect' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Connexion réussie', token });
  } catch (error) {
    res.status(500).json({ message: 'Erreur de serveur', error });
  }
};

exports.logout = (req, res) => {
  res.status(200).json({ message: 'Déconnexion réussie' });
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erreur de serveur', error });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const updatedData = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, updatedData, { new: true });
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.status(200).json({ message: 'Profil mis à jour', user });
  } catch (error) {
    res.status(500).json({ message: 'Erreur de serveur', error });
  }
};

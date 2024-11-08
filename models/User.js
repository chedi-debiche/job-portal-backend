// backend/models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['candidat', 'recruteur', 'admin'], default: 'candidat' },
  phone: { type: String, required: false },
  location: { type: String, required: false },
  image: { type: String, required: false },
  skills: { type: String, required: false },
  experience: { type: String, required: false },
  linkedin: { type: String, required: false },
  cv: { type: String, required: false },
  companyName: { type: String, required: false },
  website: { type: String, required: false },
  logo: { type: String, required: false },
  companyDescription: { type: String, required: false },
  contactName: { type: String, required: false },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);

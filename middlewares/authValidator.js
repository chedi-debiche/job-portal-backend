// backend/middlewares/authValidator.js

const Joi = require('joi');

const signupSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('candidat', 'recruteur', 'admin').required(),
  phone: Joi.string().optional(),
  location: Joi.string().optional(),
  skills: Joi.string().when('role', { is: 'candidat', then: Joi.required(), otherwise: Joi.optional() }),
  experience: Joi.string().when('role', { is: 'candidat', then: Joi.required(), otherwise: Joi.optional() }),
  linkedin: Joi.string().uri().optional(),
  cv: Joi.string().optional(),
  companyName: Joi.string().when('role', { is: 'recruteur', then: Joi.required(), otherwise: Joi.optional() }),
  website: Joi.string().uri().optional(),
  logo: Joi.string().optional(),
  companyDescription: Joi.string().when('role', { is: 'recruteur', then: Joi.required(), otherwise: Joi.optional() }),
  contactName: Joi.string().when('role', { is: 'recruteur', then: Joi.required(), otherwise: Joi.optional() }),
});

const validateSignup = (req, res, next) => {
  const { error } = signupSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

module.exports = { validateSignup };

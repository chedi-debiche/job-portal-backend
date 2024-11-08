// routes/jobRoutes.js
const express = require('express');
const { createJob, getAllJobs, getJobById, updateJob, deleteJob } = require('../controllers/jobController');
const { authenticateUser, authorizeRecruiter, authorizeAdmin } = require('../middlewares/authMiddleware'); 

const router = express.Router();

// Créer une nouvelle offre d'emploi (recruteurs uniquement)
router.post('/', authenticateUser, authorizeRecruiter, createJob);

// Lister toutes les offres d'emploi (accessible à tous)
router.get('/', getAllJobs);

// Voir les détails d’une offre d'emploi (accessible à tous)
router.get('/:id', getJobById);

// Mettre à jour une offre d'emploi (recruteurs uniquement)
router.put('/:id', authenticateUser, authorizeRecruiter, updateJob);

// Supprimer une offre d'emploi (administrateurs uniquement)
router.delete('/:id', authenticateUser, authorizeRecruiter , deleteJob);

module.exports = router;

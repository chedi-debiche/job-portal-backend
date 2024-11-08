// controllers/jobController.js
const Job = require('../models/Job');

// Créer une nouvelle offre d'emploi
exports.createJob = async (req, res) => {
  try {
    const job = new Job({
      ...req.body,
      recruiterId: req.user.id, // Assure-toi que l'utilisateur est authentifié
      postedAt: Date.now()
    });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Lister toutes les offres d'emploi
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Voir les détails d’une offre d'emploi
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Offre d'emploi introuvable" });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour une offre d'emploi
// Mettre à jour une offre d'emploi
exports.updateJob = async (req, res) => {
    try {
      const job = await Job.findById(req.params.id);
      if (!job) {
        return res.status(404).json({ message: "Offre d'emploi introuvable" });
      }
      // Vérifie si l'utilisateur est le recruteur ou un administrateur
      if (job.recruiterId.toString() !== req.user.id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({ message: "Accès refusé" });
      }
  
      Object.assign(job, req.body);
      await job.save();
      res.status(200).json(job);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
// Supprimer une offre d'emploi
exports.deleteJob = async (req, res) => {  
    try {
      const job = await Job.findById(req.params.id);
      if (!job) {
        return res.status(404).json({ message: "Offre d'emploi introuvable" });
      }
  
      // Ajoute des logs pour vérifier les informations de l'utilisateur et du recruteur
    //   console.log("Job recruiter ID:", job.recruiterId.toString());
    //   console.log("Request user ID:", req.user.id.toString());
    //   console.log("Request user role:", req.user.role);
  
      // Vérifie si l'utilisateur est un recruteur propriétaire de l'offre ou un admin
      if (job.recruiterId.toString() !== req.user.id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({ message: "Accès refusé" });
      }
  
      // Supprime le job en utilisant findByIdAndDelete
      await Job.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Offre d'emploi supprimée avec succès" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
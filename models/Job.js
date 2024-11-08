// models/Job.js
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true,
  },
  description: { 
    type: String, 
    required: true,
  },
  skillsRequired: { 
    type: [String], 
    required: true,
  },
  location: { 
    type: String, 
    required: true,
  },
  employmentType: { 
    type: String, 
    enum: ["CDI", "CDD", "Stage", "Freelance", "Alternance"],
    required: true,
  },
  salary: { 
    type: String,
    required: false,
  },
  experienceLevel: { 
    type: String, 
    enum: ["Débutant", "Intermédiaire", "Senior"],
    required: true,
  },
  postedAt: { 
    type: Date, 
    default: Date.now,
  },
  closingDate: { 
    type: Date, 
    required: true,
  },
  companyName: { 
    type: String, 
    required: true,
  },
  companyDescription: { 
    type: String, 
    required: false,
  },
  recruiterName: { 
    type: String, 
    required: true,
  },
  contactEmail: { 
    type: String, 
    required: true,
  },
  status: { 
    type: String, 
    enum: ["Ouverte", "Fermée", "En attente"],
    default: "Ouverte",
  },
  recruiterId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
  }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;

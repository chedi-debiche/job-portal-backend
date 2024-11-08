// backend/config/fieldConfig.js

const fieldConfig = {
    candidat: [
      { name: 'username', type: 'text', required: true },
      { name: 'email', type: 'email', required: true },
      { name: 'password', type: 'password', required: true },
      { name: 'phone', type: 'text', required: true },
      { name: 'location', type: 'text', required: true },
      { name: 'skills', type: 'text', required: true },
      { name: 'experience', type: 'text', required: true },
      { name: 'linkedin', type: 'url', required: false },
      { name: 'cv', type: 'file', required: true },
    ],
    recruteur: [
      { name: 'username', type: 'text', required: true },
      { name: 'email', type: 'email', required: true },
      { name: 'password', type: 'password', required: true },
      { name: 'companyName', type: 'text', required: true },
      { name: 'website', type: 'url', required: false },
      { name: 'location', type: 'text', required: true },
      { name: 'logo', type: 'file', required: false },
      { name: 'companyDescription', type: 'textarea', required: true },
      { name: 'contactName', type: 'text', required: true },
      { name: 'phone', type: 'text', required: true },
    ],
    admin: [
      { name: 'username', type: 'text', required: true },
      { name: 'email', type: 'email', required: true },
      { name: 'password', type: 'password', required: true },
    ],
  };
  
  module.exports = fieldConfig;
  
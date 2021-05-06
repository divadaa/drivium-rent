require('dotenv').config();
const bcrypt = require('bcrypt');

const ParticularInvestorModel = require('../models/ParticularInvestor');
const particularinvestor = require('../seeds/Particularinvestors.json');

const createParticularInvestors = async (req, res) => {
  try {
    await ParticularInvestorModel.insertMany(particularinvestor);
    console.log('PARTICULAR INVESTOR CREATED!')
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  createParticularInvestors
};

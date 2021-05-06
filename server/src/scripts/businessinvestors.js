require('dotenv').config();
const bcrypt = require('bcrypt');

const BusinessInvestorModel = require('../models/BusinessInvestor');
const businessinvestor = require('../seeds/Businessinvestors.json');

const createBusinessInvestors = async (req, res) => {
  try {
    await BusinessInvestorModel.insertMany(businessinvestor);
    console.log('BUSINESS INVESTOR CREATED!')
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  createBusinessInvestors
};

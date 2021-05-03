const route = require('express').Router();
const passport = require('../configs/passport');

const { isAuthenticated } = require('../middlewares/isAuthenticated');

route.get('/', [isAuthenticated], async (req, res, next) => {
    try {
     
      
    } catch (err) {
      console.log(err);
      res.status(500).json({
        data: err,
        ok: false,
      });
    }
  });
  
  module.exports = route;
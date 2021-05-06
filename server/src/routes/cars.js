const router = require('express').Router();

const CarModel = require('../models/Car');


router.get('/', async (req, res, next) => {
    const perPage = 5;
    const page = req.query.page || 1;
  
    try {
      const result = await CarModel.find({})
        .skip(perPage * page - perPage)
        .limit(perPage);
  
      const nextPage =
        result.length < perPage ? null : `/products?page=${Number(page) + 1}`;
  
      res.status(200).json({
        success: true,
        count: result.length,
        currentPage: page,
        nextPage: nextPage,
        data: result
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/ref/:carRef', async (req, res, next) => {
    const { carRef } = req.params;
  
    try {
      const result = await CarModel.findOne({ carRef });
  
      if (!result) {
        const error = new Error('coche no encontrado');
        error.code = 404;
        throw error;
      }
  
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  });
  
  router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
  
    try {
      const result = await CarModel.findById(id);
  
      if (!result) {
        const error = new Error('coche no encontrado');
        error.code = 404;
        throw error;
      }
  
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  });
  
  module.exports = router;



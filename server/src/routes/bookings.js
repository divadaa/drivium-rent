const router = require('express').Router();

const BookingModel = require('../models/Booking');
// const StockModel = require('../models/Stock');
const CarModel = require('../models/Car');

const isAuthenticated = require('../middlewares/isAuthenticated');

router.get('/', [isAuthenticated], async (req, res, next) => {
  try {
    const userBookings = await BookingModel.find({ userId: req.user });

    res.status(200).json({
      success: true,
      count: userBookings.length,
      data: { userBookings }
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', [isAuthenticated], async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { productId, dateStart, dateEnd } = req.body;

    const previousBooking = await BookingModel.findOne({
      productId,
      pickup: { $lte: dateEnd },
      return: { $gte: dateEnd }
    });

    if (previousBooking) {
      throw new Error('There is a previous booking');
    }

    const car = await CarModel.findById(productId);

    const pickupDate = new Date(dateStart);
    const returnDate = new Date(dateEnd);
    const diffTime = Math.abs(returnDate - pickupDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const totalPrice = car.get('pricePerDay') * diffDays;

    const newBooking = await BookingModel.create({
      userId,
      productId,
      pickup: dateStart,
      return: dateEnd,
      totalPrice
    });

    res.status(201).json({ data: newBooking });
  } catch (error) {
    next(error);
  }
});

// TODO: Crear una función para que un USER pueda eliminar un booking SUYO dada la id del booking
// 1. Crear endpoint de tipo DELETE
// 2. Recibir por param el /:bookingId
// 3. Eliminar un Booking con el campo userId igual a req.user y que tenga _id igual a bookingId

// ////////////////////////////////////////////////////////////////////////////////////////
// TODO: Crear proyecto en React que permita:
// 1. Listar todos los coches en una Home
// 2. Logearme para poder crear un Booking
// 3. Ver mi lista de Bookings y eliminar alguno de ellos

module.exports = router;

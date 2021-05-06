const router = require('express').Router();

const BookingModel = require('../models/Booking');
const StockModel = require('../models/Stock');
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
      pickup: { $gte: dateStart },
      return: { $lte: dateEnd }
    });

    if (previousBooking) {
      throw new Error('There is a previous booking');
    }

    // TODO: añadir pricePerDay al modelo Car y multiplicar por lo días de reserva
    const newBooking = await BookingModel.create({
      userId,
      productId,
      pickup: dateStart,
      return: dateEnd,
      totalPrice: 0
    });

    res.status(201).json({ data: newBooking });
  } catch (error) {
    next(error);
  }
});

router.get('/:bookingId', [isAuthenticated], async (req, res, next) => {
  const { bookingId } = req.params;

  try {
    const result = await BookingModel.findById(orderId).populate({
      path: 'carsQuantity.carId',
      select: {
        price: 1,
        brand: 1,
        model: 1,
        type: 1,
        pictures: 1
      }
    });

    if (!result) throw new Error('reserva no encontrada');

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

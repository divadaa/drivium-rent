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

router.delete('/:bookingId',[isAuthenticated], async (req, res, next) => {
  try {
    const bookingId = req.params.bookingId;
    const userId = req.user._id;

    await BookingModel.findOneAndDelete({ userId, _id: bookingId })
    res.status(200).json({
      success: true
    })
  } catch (error) {
    console.error('> error deleting a booking: ', error.message)
    next(new Error('error deleting a booking'))
  }
})

module.exports = router;

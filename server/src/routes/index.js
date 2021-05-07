const router = require('express').Router();

router.use('/user', require('./users'));
router.use('/car', require('./cars'));
router.use('/booking', require('./bookings'));
// router.use('/businessinvestor', require('./businessinvestor'));
// router.use('/particularinvestor', require('./particularinvestor'));

module.exports = router;

// const route = require('express').Router();

// const userRoutes = require('./users')
// const carsRoutes = require('./cars')
// const businessinvestorRoutes = require('./businessinvestor')
// const particularinvestorRoutes = require('./particularinvestor')

// route.use('/users', userRoutes);
// route.use('/cars', carsRoutes);
// route.use('/businessinvestor', businessinvestorRoutes);
// route.use('/particularinvestor', particularinvestorRoutes);

// route.use('/stocks', userRoutes)


// module.exports = route;

const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/cars', require('./cars'));
router.use('/booking', require('./booking'));
router.use('/businessinvestor', require('./businessinvestor'));
router.use('/particularinvestor', require('./particularinvestor'));


module.exports = router;








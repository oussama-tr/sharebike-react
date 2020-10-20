const router = require('express').Router();

const userRoutes = require('./user.route');
const eventRouter = require('./event.route');
const sliderRouter = require('./slider.route');
const bikeRouter = require('./bike.route');
const stationRouter = require('./station.route');
const reservationRouter = require('./reservation.route');
const favoriteEventRouter = require('./favoriteEvent.route');
const favoriteStationRouter = require('./favoriteStation.route');

router.get('/', (req, res) => {
  res.send({
    success: true,
  });
});
router.use('/favoriteEvent', favoriteEventRouter);
router.use('/favoriteStation', favoriteStationRouter);
router.use('/user', userRoutes);
router.use('/events', eventRouter);
router.use('/slider', sliderRouter);
router.use('/bikes', bikeRouter);
router.use('/stations', stationRouter);
router.use('/reservations', reservationRouter);

module.exports = router;

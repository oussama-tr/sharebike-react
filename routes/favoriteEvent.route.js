const router = require('express').Router();
const { FavoriteEventModel } = require('../models');

const passport = require('passport');
const { upload } = require('../utils/Uploader');

/* GET All Bikes .
@Route : bikes/
*/
router.get('/', (req, res) => {
    FavoriteEventModel.find(query)
        .populate('user')
        .populate('event')
        .sort('-date')
        .then((data) => {
            res.json(data);
        })
        .catch((err) => res.send(err));
});

/* GET Single Bikes .
@Route : bikes/:id
*/
router.get('/:user/:event', (req, res) => {
    console.log("salem");
    const query = {
        user: req.params.user,
        event: req.params.event,
    };

    FavoriteEventModel.findOne(query)
        .populate('user')
        .populate('event')
        .then((data) => {
            res.json(data);
        })
        .catch((err) => res.send(err));
});



/* Add Bike .
@Route : bikes/add + body {}
*/

router.post(
    '/add',
    (req, res) => {
        var newBike;
        newBike = new FavoriteEventModel({
            user: req.body.user,
            event: req.body.event,

        });

        newBike
            .save()
            .then((bike) => res.json(bike))
            .catch((err) => res.status(400).json(err));
    }
);

/* DELETE Single Bike.
@Route : bikes/delete/:id
*/
router.delete(
    '/delete/:id',
    (req, res) => {
        let query = {
            _id: req.params.id,
        };
        FavoriteEventModel.deleteOne(query)
            .then((favoriteevent) => res.json(favoriteevent))
            .catch((err) => res.status(400).json(err));
    }
);

module.exports = router;

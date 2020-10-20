const router = require('express').Router();
const { FavoriteEvenModel } = require('../models');
const passport = require('passport');
const { upload } = require('../utils/Uploader');

/* GET All Bikes .
@Route : bikes/
*/
router.get('/', (req, res) => {
    FavoriteEvenModel.find()
        .populate('user')
        .populate('station')
        .sort('-date')
        .then((data) => {
            res.json(data);
        })
        .catch((err) => res.send(err));
});

/* GET Single Bikes .
@Route : bikes/:id
*/
router.get('/:id', (req, res) => {
    const query = {
        _id: req.params.id,
    };

    FavoriteEvenModel.findOne(query)
        .populate('user')
        .populate('station')
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
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        var newBike;
        if (req.file) {
            newBike = new FavoriteEvenModel({
                title: req.body.title,
                user: req.body.user,
                station: req.body.station,
                date:  req.body.date,
            
                


            });
        }
        else{
            newBike = new FavoriteEvenModel({
                title: req.body.title,
                user: req.body.user,
                station: req.body.station,
                date:  req.body.date,
            
            });
        }
        newBike
            .save()
            .then((bike) => res.json(bike))
            .catch((err) => res.status(400).json(err));
    }
);

/* UPDATE Single Bike.
@Route : bikes/update/:id
*/
router.put(
    '/update/:id',
    upload.single('imageData'),
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const query = {
            _id: req.params.id,
        };

        let bikeUpdated;
        if (req.file) {
            bikeUpdated = {
                title: req.body.title,
                
                date:  req.body.date,
                user: req.body.user,
                station: req.body.station,
                  };
        } else {
            bikeUpdated = {
                title: req.body.title,
                user: req.body.user,
                station: req.body.station,
                date:  req.body.date,
                  };
        }

        FavoriteEvenModel.findOneAndUpdate(
            query,
            {
                $set: bikeUpdated,
            },
            { new: true }
        )
            .then((bike) => res.json(bike))
            .catch((err) => res.status(400).json(err));
    }
);

/* DELETE Single Bike.
@Route : bikes/delete/:id
*/
router.delete(
    '/delete/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        let query = {
            _id: req.params.id,
        };
        FavoriteEvenModel.deleteOne(query)
            .then((bike) => res.json(bike))
            .catch((err) => res.status(400).json(err));
    }
);

router.put('/archive/:id', (req, res) => {
    let query = {
        _id: req.params.id,
    };
    FavoriteEvenModel.findOneAndUpdate(
        query,
        {
            $set: { archived: true },
        },
        { new: true }
    )
        .then((bike) => res.json(bike))
        .catch((err) => res.status(400).json(err));
});

router.put('/unarchive/:id', (req, res) => {
    let query = {
        _id: req.params.id,
    };
    FavoriteEvenModel.findOneAndUpdate(
        query,
        {
            $set: { archived: false },
        },
        { new: true }
    )
        .then((bike) => res.json(bike))
        .catch((err) => res.status(400).json(err));
});

module.exports = router;

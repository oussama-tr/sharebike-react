const router = require('express').Router();
const { BikeModel } = require('../models');
const passport = require('passport');
const { upload } = require('../utils/Uploader');

/* GET All Bikes .
@Route : bikes/
*/
router.get('/', (req, res) => {
    BikeModel.find()
        .populate('user')
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

    BikeModel.findOne(query)
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
    upload.single('imageData'),
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        var newBike;
        if (req.file) {
            newBike = new BikeModel({
                title: req.body.title,
                description: req.body.description,
                type: req.body.type,
                archived: false,
                user: req.body.user,
                weight: req.body.weight,
                etat: req.body.etat,
                disponibilite: req.body.disponibilite,
                image: req.file.path,


            });
        }
        else{
            newBike = new BikeModel({
                title: req.body.title,
                description: req.body.description,
                type: req.body.type,
                archived: false,
                user: req.body.user,
                weight: req.body.weight,
                etat: req.body.etat,
                disponibilite: req.body.disponibilite,
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
                description: req.body.description,
                type: req.body.type,
                archived: false,
                image: req.file.path,
                user: req.body.user,
                weight: req.body.weight,
                etat: req.body.etat,
                disponibilite: req.body.disponibilite,      };
        } else {
            bikeUpdated = {
                title: req.body.title,
                description: req.body.description,
                type: req.body.type,
                archived: false,
                user: req.body.user,
                weight: req.body.weight,
                etat: req.body.etat,
                disponibilite: req.body.disponibilite,      };
        }

        BikeModel.findOneAndUpdate(
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
        BikeModel.deleteOne(query)
            .then((bike) => res.json(bike))
            .catch((err) => res.status(400).json(err));
    }
);

router.put('/archive/:id', (req, res) => {
    let query = {
        _id: req.params.id,
    };
    BikeModel.findOneAndUpdate(
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
    BikeModel.findOneAndUpdate(
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

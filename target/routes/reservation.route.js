const router = require('express').Router();
const { ReservationModel,BikeModel } = require('../models');
const passport = require('passport');
const { upload } = require('../utils/Uploader');

/* GET All Stations .
@Route : stations/
*/
router.get('/', (req, res) => {
    ReservationModel.find()
        .populate('user')
        .populate({path:'station',populate:{path:'bikes'}})
        .sort('-date')
        .then((data) => {
            res.json(data);
        })
        .catch((err) => res.send(err));
});

/* GET Single Stations .
@Route : stations/:id
*/
router.get('/:id', (req, res) => {
    const query = {
        _id: req.params.id,
    };

    ReservationModel.findOne(query)
        .populate('user')
        .populate({path:'station',populate:{path:'bikes'}})
        .then((data) => {
            res.json(data);
        })
        .catch((err) => res.send(err));
});
router.get('/user/:user', (req, res) => {
    const query = {
        user : req.params.user,
    };

    ReservationModel.find(query)
        .populate('user')
        .populate({path:'station',populate:{path:'bikes'}})
        .then((data) => {
            res.json(data);
        })
        .catch((err) => res.send(err));
});

/* Add Station .
@Route : stations/add + body {}
*/

router.post(
    '/add',
    upload.single('imageData'),
    (req, res) => {
        var newBike;

            newReservation = new ReservationModel({
                dateReservation: req.body.dateReservation,
                station: req.body.station,
                user: req.body.user,
            });
        newReservation
            .save()
            .then((station) => res.json(station))
            .catch((err) => res.status(400).json(err));
    }
);

//add bike to station

router.post(
    '/BikeStation/add',
    upload.single('imageData'),
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        var newBike;
        if (req.file){
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
                station:req.body.station

            });}
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
                    station:req.body.station

                });
        }
        newBike.save();
        const query = {
            _id: req.body.station,
        };
        StationModel.findOne(query)
            .then((data) => {
                const station = data;
                station.bikes.push(newBike);
                station.save();
                console.log(station);
            })
            .catch((err) => console.log(err));
    }
);

/* UPDATE Single Station.
@Route : stations/update/:id
*/
router.put(
    '/update/:id',
    upload.single('imageData'),
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const query = {
            _id: req.params.id,
        };

        let stationUpdated;
        if (req.file) {
            stationUpdated = {
                title: req.body.title,
                archived: false,
                image: req.file.path,
                alt: req.body.alt,
                lng: req.body.lng,
                user: req.body.user,
                numberOfBikesCapacity: req.body.numberOfBikesCapacity,
                numberOfBikesAvailable: req.body.numberOfBikesAvailable,
                bikes: [],
                etat: req.body.etat,
            };
        } else {
            stationUpdated = {
                title: req.body.title,
                archived: false,
                user: req.body.user,
                alt: req.body.alt,
                lng: req.body.lng,
                numberOfBikesCapacity: req.body.numberOfBikesCapacity,
                numberOfBikesAvailable: req.body.numberOfBikesAvailable,
                bikes: [],
                etat: req.body.etat,
            };
        }

        StationModel.findOneAndUpdate(
            query,
            {
                $set: stationUpdated,
            },
            { new: true }
        )
            .then((station) => res.json(station))
            .catch((err) => res.status(400).json(err));
    }
);

/* DELETE Single Station.
@Route : stations/delete/:id
*/
router.delete(
    '/delete/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        let query = {
            _id: req.params.id,
        };
        StationModel.deleteOne(query)
            .then((station) => res.json(station))
            .catch((err) => res.status(400).json(err));
    }
);

router.put('/archive/:id', (req, res) => {
    let query = {
        _id: req.params.id,
    };
    StationModel.findOneAndUpdate(
        query,
        {
            $set: { archived: true },
        },
        { new: true }
    )
        .then((station) => res.json(station))
        .catch((err) => res.status(400).json(err));
});

router.put('/unarchive/:id', (req, res) => {
    let query = {
        _id: req.params.id,
    };
    StationModel.findOneAndUpdate(
        query,
        {
            $set: { archived: false },
        },
        { new: true }
    )
        .then((station) => res.json(station))
        .catch((err) => res.status(400).json(err));
});

module.exports = router;

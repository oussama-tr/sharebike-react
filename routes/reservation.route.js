const router = require('express').Router();
const { ReservationModel } = require('../models');
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
           // console.log(req.body.dateReservation);
        newReservation
            .save()
            .then((station) => res.json(station))
            .catch((err) => res.status(400).json(err));
    }
);

//add bike to station


/* UPDATE Single Station.
@Route : stations/update/:id
*/
router.put(
    '/update/:id',
    (req, res) => {
        const query = {
            _id: req.params.id,
        };

        let reservationUpdated;

        reservationUpdated ={
            dateReservation: req.body.dateReservation,
            station: req.body.station,
            user: req.body.user,
        };
        console.log(req.params.id);
        ReservationModel.findOneAndUpdate(
            query,
            {
                $set: reservationUpdated,
            },
            { new: true }
        )
            .then((reservation) => res.json(reservation))
            .catch((err) => console.log(err));
    }
);

/* DELETE Single Station.
@Route : stations/delete/:id
*/
router.delete(
    '/delete/:id',
    (req, res) => {
        let query = {
            _id: req.params.id,
        };
        ReservationModel.deleteOne(query)
            .then((station) => res.json(station))
            .catch((err) => res.status(400).json(err));
    }
);

router.put('/archive/:id', (req, res) => {
    let query = {
        _id: req.params.id,
    };
    ReservationModel.findOneAndUpdate(
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
    ReservationModel.findOneAndUpdate(
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

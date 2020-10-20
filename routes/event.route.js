const router = require('express').Router();
const { EventModel } = require('../models');
const passport = require('passport');
const { upload } = require('../utils/Uploader');

/* GET All Events . 
@Route : events/
*/
router.get('/', (req, res) => {
  EventModel.find()
    .populate('user')
    .sort('-dateStart')
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.send(err));
});

/* GET 3 Latest Events . 
@Route : events/
*/
router.get('/latest', (req, res) => {
  EventModel.find()
    .sort('-dateStart')
    .limit(3)
    .then((data) => {
      return res.json(data);
    })
    // .catch((err) => res.send(err));
    .catch(error => { 
      console.log('caught', error.message); 
    });
});

/* GET Single Events . 
@Route : events/:id
*/
router.get('/:id', (req, res) => {
  const query = {
    _id: req.params.id,
  };
  EventModel.findOne(query)
    .populate('user')
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.send(err));
});

/* Add Event . 
@Route : events/add + body {}
*/

// second parameter upload.single('eventImage');
router.post(
  '/add',
  upload.single('imageData'),
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    newEvent = new EventModel({
      title: req.body.title,
      dateStart: req.body.dateStart,
      dateEnd: req.body.dateEnd,
      description: req.body.description,
      type: req.body.type,
      archived: false,
      url: req.body.url,
      image: req.file.path,
      user: req.body.user,
    });

    newEvent
      .save()
      .then((event) => res.json(event))
      .catch((err) => res.status(400).json(err));
  }
);

/* UPDATE Single Event. 
@Route : events/update/:id
*/
router.put(
  '/update/:id',
  upload.single('imageData'),
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const query = {
      _id: req.params.id,
    };

    let eventUpdated;
    if (req.file) {
      eventUpdated = {
        title: req.body.title,
        dateStart: req.body.dateStart,
        dateEnd: req.body.dateEnd,
        description: req.body.description,
        type: req.body.type,
        url: req.body.url,
        image: req.file.path,
        user: req.body.user,
      };
    } else {
      eventUpdated = {
        title: req.body.title,
        dateStart: req.body.dateStart,
        dateEnd: req.body.dateEnd,
        description: req.body.description,
        type: req.body.type,
        url: req.body.url,
        user: req.body.user,
      };
    }

    EventModel.findOneAndUpdate(
      query,
      {
        $set: eventUpdated,
      },
      { new: true }
    )
      .then((event) => res.json(event))
      .catch((err) => res.status(400).json(err));
  }
);

/* DELETE Single Event. 
@Route : events/delete/:id
*/
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let query = {
      _id: req.params.id,
    };
    EventModel.deleteOne(query)
      .then((event) => res.json(event))
      .catch((err) => res.status(400).json(err));
  }
);

router.put('/archive/:id', (req, res) => {
  let query = {
    _id: req.params.id,
  };
  EventModel.findOneAndUpdate(
    query,
    {
      $set: { archived: true },
    },
    { new: true }
  )
    .then((event) => res.json(event))
    .catch((err) => res.status(400).json(err));
});

router.put('/unarchive/:id', (req, res) => {
  let query = {
    _id: req.params.id,
  };
  EventModel.findOneAndUpdate(
    query,
    {
      $set: { archived: false },
    },
    { new: true }
  )
    .then((event) => res.json(event))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;

var express = require('express');
var router = express.Router();
const passport = require('passport');
const { upload } = require('../utils/Uploader');
const { SliderModel } = require('../models/index');
const cleaner = require('../utils/fileCleaner');

/* GET All Slider . 
@Route : Slider/
*/
router.get('/', function(req, res, next) {
  SliderModel.find({ status: true })
    .populate('user')
    .sort('-date')
    .then(data => {
      res.json(data);
    });
});


/* GET add Slider . 
@Route : Slider/add
*/
router.post(
  '/add',
  upload.single('image'),
  passport.authenticate('jwt', { session: false }),
  function(req, res) {
    newSlider = new SliderModel({
      title: req.body.title,
      date: new Date(),
      status: req.body.status,
      url: req.body.url,
      description: req.body.description,
      titleDescription: req.body.titleDescription,
      btnName: req.body.btnName,
      image: req.file.path,
      user: req.user._id
    });
    newSlider.save(function(err, result) {
      if (err) res.send(err);
      else res.send(result);
    });
  }
);

/* UPDATE Slider by Id . 
@Route : Slider/update/:id
*/
router.put(
  '/update/:id',
  upload.single('image'),
  passport.authenticate('jwt', { session: false }),
  function(req, res) {
    if (req.file) {
      //Delete old image
      SliderModel.findById(req.params.id).then(old => {
        cleaner(old.image);
        SliderModel.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              title: req.body.title,
              date: new Date(),
              status: req.body.status,
              url: req.body.url,
              image: req.file.path,
              description: req.body.description,
              titleDescription: req.body.titleDescription,
              btnName:req.body.btnName,
              user: req.user._id
            }
          },
          { new: true }
        ).then(slider => res.json(slider))
        .catch(err => res.status(400).json(err));
      });
    } else {
      SliderModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            title: req.body.title,
            date: new Date(),
            status: req.body.status,
            url: req.body.url,
            description: req.body.description,
            titleDescription: req.body.titleDescription,
            btnName:req.body.btnName,
            user: req.user._id
          }
        },
        { new: true }
      ).then(slider => res.json(slider))
      .catch(err => res.status(400).json(err));
    }
  }
);

/* DELETE Slider by Id . 
@Route : Slider/delete/:id
*/
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), function(
  req,
  res,
  next
) {
  let query = {
    _id: req.params.id
  };
  SliderModel.findById(req.params.id).then(old => {
    cleaner(old.image);
    SliderModel.findByIdAndDelete(query, err => {
      if (err) {
        res.status(500).json(err);
        return;
      } else {
        res.status(204).send('Slider deleted');
      }
    });
  });
});

/* GET Slider by Id . 
@Route : Slider/id/:id
*/
router.get('/id/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
  let query = {
    _id: req.params.id
  };
  SliderModel.findById(query, function(err, Slider) {
    if (err) return res.send(err);
    res.send(Slider);
  }).populate('user');
});

/* Search Slider by title . 
@Route : Slider/search
*/
router.get('/search', function(req, res) {
  var title = req.query.title;
  SliderModel.find({ status: 'true', title: new RegExp(title, 'i') })
    .populate('user')
    .sort('-date')
    .then(data => {
      res.json(data);
    });
});

/* ARCHIVE Single Slider. 
@Route : slider/archive/:id
*/
router.put('/archive/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  let query = {
    _id: req.params.id
  };
  SliderModel.findByIdAndUpdate(
    query,
    {
      $set: { status: false }
    },
    { new: true }
  )
    .then(event => res.json(event))
    .catch(err => res.status(400).json(err));
});

/* UNARCHIVE Single Slider. 
@Route : slider/unarchive/:id
*/
router.put('/unarchive/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  let query = {
    _id: req.params.id
  };
  SliderModel.findByIdAndUpdate(
    query,
    {
      $set: { status: true }
    },
    { new: true }
  )
    .then(event => res.json(event))
    .catch(err => res.status(400).json(err));
});

/* Search all Slider by title . 
@Route : Slider/searchall
*/
router.get('/searchall', passport.authenticate('jwt', { session: false }), function(req, res) {
  var title = req.query.title;
  SliderModel.find({ title: new RegExp(title, 'i') })
    .populate('user')
    .sort('-date')
    .then(data => {
      res.json(data);
    });
});

module.exports = router;

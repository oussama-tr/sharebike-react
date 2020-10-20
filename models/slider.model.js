var mongoose = require('mongoose');
var SliderSchema = mongoose.Schema({
  title: String,
  date: Date,
  status: {
    type: Boolean,
    required: false
  },
  url: {
    type: String,
    required: false
  },
  titleDescription: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  btnName: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
});
var Slider = mongoose.model('Slider', SliderSchema);
module.exports = Slider;

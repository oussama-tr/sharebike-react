const mongoose = require('mongoose');
const eventTypes = require('../enums/event.types');
const Schema = mongoose.Schema;
const eventSchema = mongoose.Schema(
  {
    title: String,
    dateStart: Date,
    dateEnd: Date,
    description: String,
    archived: {
      type: Boolean,
      required: false
    },
    type: {
      type: String,
      enum: eventTypes
    },
    url: String,
    image: {
      type: String,
      required: false
    },
    user: { type: Schema.Types.ObjectId, ref: 'users' }
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model('event', eventSchema);


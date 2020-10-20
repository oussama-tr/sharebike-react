const mongoose = require('mongoose');
const stationStateTypes = require('../enums/station.types');
const Schema = mongoose.Schema;

const stationSchema = mongoose.Schema(
  {
    title: String,
    alt: String,
    lng: String,
    numberOfBikesCapacity: Number,
    numberOfBikesAvailable: Number,
      bikes: [{ type: Schema.Types.ObjectId, ref: 'bike' }],
    archived: {
      type: Boolean,
      required: false,
    },
    etat: {
      type: String,
      enum: stationStateTypes,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    user: { type: Schema.Types.ObjectId, ref: 'users' },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('station', stationSchema);

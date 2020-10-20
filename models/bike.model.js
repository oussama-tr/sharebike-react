const mongoose = require('mongoose');
const { bikeStateTypes, bikeTypes, bikeDisponibilityTypes } = require('../enums/bike.types');
const Schema = mongoose.Schema;
const bikeSchema = mongoose.Schema(
  {
    title: String,
    weight: Number,
    etat: {
      type: String,
      enum: bikeStateTypes,
      required: false,
    },
    disponibilite: {
      type: String,
      enum: bikeDisponibilityTypes,
      required: false,
    },
    description: String,
    archived: {
      type: Boolean,
      required: false,
    },
    type: {
      type: String,
      enum: bikeTypes,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    station: { type: Schema.Types.ObjectId, ref: 'station' },
  },
  {
    timestamps: true,
  }
);
const event = mongoose.model('bike', bikeSchema);

module.exports = event;

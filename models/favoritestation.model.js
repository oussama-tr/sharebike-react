const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const favoriteStationSchema = mongoose.Schema(
  {
    title: String,
    date: {
      type: Date,
      required: false,
    },
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    station: { type: Schema.Types.ObjectId, ref: 'station' },
  },
  {
    timestamps: true,
  }
);
const favoriteStation = mongoose.model('favoriteStation', favoriteStationSchema);

module.exports = favoriteStation;

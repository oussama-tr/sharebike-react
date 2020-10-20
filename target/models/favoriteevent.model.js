const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const favoriteEventSchema = mongoose.Schema(
  {
    title: String,
    date: {
      type: Date,
      required: false,
    },
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    event: { type: Schema.Types.ObjectId, ref: 'event' },
  },
  {
    timestamps: true,
  }
);
const favoriteEvent = mongoose.model('favoriteEvent', favoriteEventSchema);

module.exports = favoriteEvent;

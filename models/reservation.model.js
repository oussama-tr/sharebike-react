const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = mongoose.Schema(
    {
        dateReservation: Date,
        station: { type: Schema.Types.ObjectId, ref: 'station' },
        user: { type: Schema.Types.ObjectId, ref: 'users' },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('reservation', reservationSchema);

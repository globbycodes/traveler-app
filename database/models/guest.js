const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guestReservationSchema = new Schema({
    roomNumber: {
        type: Number,
        required: true
    },
    startTimestamp: {
        type: Number,
        required: true
    },
    endTimestamp: {
        type: Number,
        required: true
    }
}, {_id: false});

const guestSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    reservation: guestReservationSchema
});

module.exports = guest = mongoose.model('guest', guestSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    timezone: {
        type: String,
        required: true
    }
});

module.exports = company = mongoose.model('company', companySchema);
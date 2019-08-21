const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const templateSchema = new Schema({
    messageTemplate: {
        type: String,
        required: true
    },
    variableNames: [String] // These variables will be replaced by actuall values
});

module.exports = template = mongoose.model('template', templateSchema);
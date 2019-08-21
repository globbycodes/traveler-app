const fs = require('fs');
const Guest = require('../models/guest');
const path = require("path");

const content = fs.readFileSync(path.resolve(__dirname, '../data/Guests.json'))
const guests = JSON.parse(content);

function seedGuests() {
    guests.forEach(guest => {
        Guest.create(guest, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Added a guest");
            }
        });
    });    
}

module.exports = seedGuests;
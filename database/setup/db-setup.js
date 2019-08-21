const mongoose = require('mongoose');

const seedGuests = require('../seed/guest-seeder');
const seedCompanies = require('../seed/company-seeder');
const seedTemplates = require('../seed/template-seeder');

const db = require('../config/keys');

function dbSetup() {
    mongoose.connect(db.mongoURI, db.newParser, (err, client) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Connected to the db");
        }

        client.db.listCollections().toArray((err, collections) => {

            if (err) {
                console.log(err);
            }

            if (collections.length !== 3) {
                client.db.dropCollection('guests', () => {
                    seedGuests();
                });

                client.db.dropCollection('companies', () => {
                    seedCompanies();
                });

                client.db.dropCollection('templates', () => {
                    seedTemplates();
                });
            }
        });
    });
}

module.exports = dbSetup;
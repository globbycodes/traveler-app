const fs = require('fs');
const Company = require('../models/company');
const path = require("path");

const content = fs.readFileSync(path.resolve(__dirname, '../data/Companies.json'))
const companies = JSON.parse(content);

function seedCompanies() {
    companies.forEach(company => {
        Company.create(company, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Added a company");
            }
        });
    });    
}

module.exports = seedCompanies;
const fs = require('fs');
const Template = require('../models/template');
const path = require("path");

const content = fs.readFileSync(path.resolve(__dirname, '../data/Templates.json'))
const templates = JSON.parse(content);

function seedTemplates() {
    templates.forEach(template => {
        Template.create(template, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Added a template");
            }
        });
    });    
}

module.exports = seedTemplates;
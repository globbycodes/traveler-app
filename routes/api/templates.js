const express = require('express');
const router = express.Router();
const Template = require('../../database/models/template');

// @route GET api/templates
// Get all templates
router.get('/', (req, res) => {
    Template.find()
        .then(templates => res.json(templates))
});

// @route POST api/templates/save
// Get all templates
router.post('/save', (req, res) => {
    const newTemplate = new Template({
        messageTemplate: req.body.messageTemplate,
        variableNames: req.body.variableNames
    });

    newTemplate.save()
        .then(template => res.json(template));
});

module.exports = router;
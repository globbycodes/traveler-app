const express = require('express');
const router = express.Router();
const Company = require('../../database/models/company');

// @route GET api/companies
// Get all companies (sorted by "id")
router.get('/', (req, res) => {
    Company.find()
        .sort({id: 1})
        .then(companies => res.json(companies))
});

module.exports = router;
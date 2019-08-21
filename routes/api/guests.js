const express = require('express');
const router = express.Router();
const Guest = require('../../database/models/guest');

// @route GET api/guests
// Get all guests (sorted by "id")
router.get('/', (req, res) => {
    Guest.find()
        .sort({id: 1})
        .then(guests => res.json(guests))
});

module.exports = router;
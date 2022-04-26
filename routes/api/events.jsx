const express = require('express');
const { route } = require('../../controllers/eventController');
const router = express.Router();

const Event = require('../../models/Event');

// @route   api/items
// @desc    Get ALL Events
// @access  Public
router.get('/', (req,res)=>{
    Event.find()
    .sort( {date: -1})
    .then(events => res.json(events))
});

module.exports = router;

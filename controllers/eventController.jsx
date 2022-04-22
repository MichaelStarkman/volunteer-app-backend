const express = require('express');
const router = express.Router();
const auth = require('../middleware/authController.jsx');
const authController = require('../middleware/authController.jsx')

// EVENT model
const Event = require('../models/event.jsx')

const { config } = require("dotenv");


// @route   GET /events
// @desc    get ALL events
// @access  public
router.get('/', async (req, res)=>{
    try{ 
        const events = await Event.find();
        res.send({
            success: true,
            data: events
        })
    }catch(err){
        res.send({
            success: false,
            data: err.message
        })
    }
});
// @route   POST /events
// @desc    Create an events
// @access  Private
router.post('/', auth, async (req, res)=>{
    console.log(req.body)
    try{
        const newEvent = await Event.create(req.body);
        res.send({
            success: true,
            data: newEvent
        })
    }catch (err){
        console.log(err)
        res.send({
            success: false,
            data: err.message
        })
    }
})
// New is handled by REACT
// Edit is handled by REACT
// @route   GET /events:id
// @desc    get one event at id
// @access  public
router.get('/:id', async (req, res)=>{
    try {
        const event = await Event.findById(req.params.id);
        if(!event){
            // throw Error is not appearing?
            throw new Error("No event by that id here")
        }
        res.send({
            success: true,
            data: event
        })
    } catch (err) {
        res.send({
        success: false,
        data: err.message
        })
    }
})
// @route   DELETE /events:id
// @desc    Delete an events
// @access  Private
router.delete('/:id', auth, async (req, res)=>{
    try{
        const event = await Event.findByIdAndDelete(req.params.id);
        res.send({
            success: true,
            data: event
        })
    }catch (err){
        res.send({
            success: false,
            data: err.message
        })
    }
})
// @route   PUT /events:id
// @desc    Update an events
// @access  public
router.put('/:id', async (req, res)=>{
    try{
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.send({
            success: true,
            data: event
        })
    }catch(err){
        res.send({
            success: false,
            data: err.message
        })
    }
})
module.exports = router;
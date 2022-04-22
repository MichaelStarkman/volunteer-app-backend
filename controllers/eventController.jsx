const express = require('express');
const router = express.Router();
const Event = require('../models/event.jsx')

// Index Route
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
// Create Route
router.post('/', async (req, res)=>{
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
// Show Route - send individual item
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
// Delete Route 
router.delete('/:id', async (req, res)=>{
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
// Update Route
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
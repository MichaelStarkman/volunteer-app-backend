const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema ({
    eventTitle: {type:String, required: true, unique: true},
    hostName: {type:String, required: true},
    location: {type:String, required: true},
    peopleNeeded: {type:Number, required: false}
    // adding description, date, picture and user later
    // eventDescription: {type:String, required: true},
    // eventDate: {type:Date, required: true},
    // picture: {type:String, required: false},
    // user: {type:String}
}, {timestamps:true});


const Event = mongoose.model('event', eventSchema);

module.exports = Event;






const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type:String, required:true, unique:true},
    // name: {type:String, maxlength:50},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    // NEED PUSH HERE ON CREATE EVENT ROUTE
    event: {type: Schema.Types.ObjectId, ref: 'Event'},
    events: Array
},
    {timestamps: true})

const User = mongoose.model('User', userSchema);

module.exports = User;
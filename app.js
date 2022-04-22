
// ___________________
// Dependencies
// ___________________
require("dotenv").config();
const { urlencoded } = require('express');
const express = require('express');
// const methodOverride = require('method-override');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
// const session = require('express-session');

// const cloudinary = require("cloudinary").v2;

const userContoller = require('./controllers/userController.jsx')
const authController = require('./controllers/authController.jsx')
const eventController = require('./controllers/eventController.jsx')
// ___________________
// port (set up for hosting w. heroku)
// ___________________
const port = process.env.PORT || 3001
// ___________________
// Database
// ___________________
const mongoURI = process.env.MONGO_URI

const jwtSecret = process.env.JWT_SECRET
// cloudinary.config({
//   cloud_name: 'lets-dish-cloudinary',
//   api_key: process.env.CLOUDINARY_API_KEY, 
//   api_secret:process.env.CLOUDINARY_API_SECRET
// })

// Connect to Mongo]
const db = mongoose.connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('MongoDB connection established:', mongoURI)
)

// Error / Disconnection
db.on('error', err => console.log(err.message + ' is Mongod not running?'))
db.on('connnected', () => console.log('mongo connected: ', process.env.MONGO_URI))
db.on('disconnected', () => console.log('mongo disconnected'))

// Middleware
app.use(morgan('short'))
app.use(cors());
app.use(express.static('public'))
app.use(urlencoded({extended: true}));
app.use(express.json());

app.use('/events', eventController)
app.use('/users', userContoller)
app.use('/auth', authController)


module.exports = app.listen(port, () => console.log('working on port', port))
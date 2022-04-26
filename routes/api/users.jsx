require("dotenv").config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Model
const User = require('../../models/User.jsx');
const { config } = require("dotenv");

// @route   POST /users
// @desc    register new user
// @access  Public

router.post('/', (req, res)=> {
    const { username, email, password} = req.body;
    console.log(req.body)
    // Simple Validation
    if(!username || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' })
    }

    // check for existing user
    User.findOne({ email })
        .then(user => {
            if(user) return res.status(400).json({ msg: 'User already exists'});

            const newUser = new User({
                username,
                email,
                password
            });
        

            // Create salt  & hash 
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user.id },
                                process.env.JWT_SECRET,
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if(err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            username: user.username,
                                            email: user.email,
                                            password: user.password
                                        }
                                    });
                                }
                           
                        )})
                })
            })
        })
});

module.exports = router;
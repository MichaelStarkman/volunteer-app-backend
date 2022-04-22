require("dotenv").config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/authController.jsx');
const authController = require('../middleware/authController.jsx')

// User Model
const User = require('../models/user.jsx');
const { config } = require("dotenv");

// @route   POST /auth
// @desc    authentic user
// @access  Public
router.post('/', (req, res)=> {
    const { email, password} = req.body;
    // Simple Validation
    if( !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' })
    }

    // check for existing user
    User.findOne({ email })
        .then(user => {
            if(!user) return res.status(400).json({ msg: 'User does not exists'});
    
            // Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials'});
                    
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
                    )
                })        
        })
});

// @route   GET /auth/user
// @desc    Get uesr data
// @access  Private
router.get('/user', auth, (req,res) =>{
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
})

module.exports = router;
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require ('bcryptjs');

// Load User Model
const User = require('../../models/User');

// HEADER that describes the Route
// @route is a GET request to api/users/test
// @description Test the users route
// @access Public (All users even non-logged in)
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// @route GET api/users/register
// @desc Register User
// @access Public
router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if(user) {
                return res.status(400).json({email: 'Email already exists'});
            }   else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200', //img size
                    r: 'pg', // image rating
                    d: 'mm' // default
                })
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar: avatar,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));  
                    });
                });
            }
        });
    });
    
    // @route   GET api/users/login
    // @desc    Login User / Returning JWT Token
    // @access  Public
    router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check for user, if no user send JSON msg
        if (!user) {
            return res.status(404).json({ email: 'User not found' });
        }
        // If there is user, Check Password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
            res.json({ msg: 'Success' });
            } else {
                return res.status(400).json({ password: 'Password incorrect' });
            }
        });
    });
  });

module.exports = router;
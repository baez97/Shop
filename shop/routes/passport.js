const debug = require('debug')('passport-app:passport:routes:passport:debug');
const error = require('debug')('passport-app:passport:routes:passport:error');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportConfig = require('../config/passport');
const User = require('../model/user');
const ShoppingCart = require('../model/shoppingCart');

router.post('/signin', function (req, res, next) {
    debug('Sign in')
    return passport.authenticate('local', { session: false },
        (err, user, info) => {
            debug('Authenticate');
            if (err || !user) {
                return res.status(400).json(err);
            }
            debug('Generating token');
            req.logIn(user, { session: false }, (err) => {
                if (err) { res.send(err); }
                var data = { id: user._id };
                const token = jwt.sign(data, passportConfig.secretKey, { expiresIn: 3600 }); //seconds
                return res.json({ token });
            });
        })(req, res);
});

router.post('/signup', function (req, res, next) {
    var user = {
        email    : req.body.email,
        password : req.body.password,
        name     : req.body.name,
        surname  : req.body.surname,
        birth    : req.body.birth,
        address  : req.body.address
    };
    console.log(user);
    debug('Sign up %O', user);
    return User.findOne({ email: user.email })
        .then((result) => {
            if (result) {
                console.log("Email already in use");
                return res.status(400).json({
                    errors: { email: { message: 'Email already in use' } }
                })
            } else {
                var promises = [];
                shoppingCart = new ShoppingCart();
                promises.push(shoppingCart.save());
                user = new User(user);
                user.password = user.encryptPassword(user.password);
                user.shoppingCart = shoppingCart;
                promises.push(user.save());
                return Promise.all(promises)
                    .then((user) => res.json(user))
                    .catch((err) => res.status(400).json(err));
            }
        })
});

router.get('/profile', passport.authenticate('jwt', { session: false }), function (req, res, next) { 
    var token = getToken(req.headers);
    if (token) {
        return res.send(req.user); 
    } else {
        return res.status(403).send({success: false, msg: 'Not Logged in.'});
    }
});

getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports = router;
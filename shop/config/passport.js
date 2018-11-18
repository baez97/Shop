const debug         = require('debug')('shop:config:passport:debug');
const error         = require('debug')('shop:config:passport:error');
const passport      = require('passport');

const User          = require('../model/user');
const secretKey     = 'your_jwt_secret';
const passportJWT   = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT    = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' },
    function (email, password, cb) {
        return User.findOne({ email: email })
            .then(user => {
                if (!user) { 
                    return cb({ 
                        errors: { password: { message: 'Email not found' } } 
                    }, false); 
                } if (!user.validPassword(password)) {
                    return cb({ 
                        errors: { password: { message: 'Invalid password' } } 
                    }, false);
                }
                return cb(null, user);
            })
            .catch(err => cb(err));
    }));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey
},
    function (jwtPayload, cb) {
        return User.findById(jwtPayload.id)
            .then(user => { return cb(null, user); })
            .catch(err => cb(err));
    }));

module.exports.secretKey = secretKey;
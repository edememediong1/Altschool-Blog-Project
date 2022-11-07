const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const userModel = require('../model/user');
const Jwtstrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const CONFIG = require('../config/config')


passport.use(
    new Jwtstrategy(
        {
            secretOrKey: CONFIG.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() 
        },
        async (payload, done) => {
            try {
                return done(null, payload.user);
            } catch (error) {
                done(error);
            }
        }
    )
);


passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, email, password, done) => {
            try {
                const first_name = req.body.first_name
                const last_name = req.body.last_name

                const user = await userModel.create({ email, password,first_name, last_name});

                return done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);


passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const user = await userModel.findOne({email});

                if (!user) {
                    return done(null, false, { message: 'User not found' });
                }

                const validate = await user.isValidPassword(password);

                if (!validate) {
                    return done(null, false, { message: 'Wrong Password' });
                }
                return done(null, user, { message: 'Logged in Successfully' });
               
            } catch (error) {
                return done(error);
            }
        }
    )
);

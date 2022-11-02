const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const {userModel} = require('../model/model');

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const CONFIG = require('../config/config')
passport.use(
    new JWTstrategy(
        {
            secretOrKey: CONFIG.JWT_SECRET,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken() // Use this if you are using Bearer token
        },
        async (token, done) => {
            try {
                return done(null, token.user);
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
                const user = await userModel.findOne({ email });

                if (!user) {
                    return done(null, false, { message: 'User not found' });
                }

                const validate = await user.isValidCredential(password);

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




































// MY CODE BELOW----------------------------


// const passport = require('passport');
// const {userModel} = require("../model/model");
// const localStrategy = require('passport-local').Strategy
// const JWTstrategy = require('passport-jwt').Strategy
// const ExtractJwt = require('passport-jwt').ExtractJwt;

// // const jwt = require('jsonwebtoken');

// const CONFIG = require('../config/config');


// // This middleware authenticates the user based on the email and password provided.
// // If the user is found, it sends the user information to the next middleware.
// // Otherwise, it reports an error.
// passport.use(
//     'login',
//     new localStrategy(
//         {
//             usernameField: 'email',
//             passwordField: 'password'
//         },
//         async (email, password, done) => {
//             try {
//                 const user = await UserModel.findOne({ email });

//                 if (!user) {
//                     return done(null, false, { message: 'User not found' });
//                 }

//                 const validate = await user.isValidPassword(password);

//                 if (!validate) {
//                     return done(null, false, { message: 'Wrong Password' });
//                 }

//                 return done(null, user, { message: 'Logged in Successfully' });
//             } catch (error) {
//                 return done(error);
//             }
//         }
//     )
// );


// // new

// passport.use(
//     new JWTstrategy(
//         {
//             secretOrKey: CONFIG.JWT_SECRET,
//             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
//         },
//         async (token, done) => {
//             try {
//                 return done(null, token.user);
//             } catch (error) {
//                done(error); 
//             }
//         }
//     )
// )





// passport.use(
//     'register',
//     new localStrategy(
//         {
//             usernameField: 'email',
//             passwordField: 'password',
//             passReqToCallback: true
//         },
//         async (req, email, password, done) => {
//             try {
//                 const first_name = req.body.first_name
//                 const last_name = req.body.last_name

//                 const user = await userModel.create({
//                     email, password,
//                     first_name, last_name
//                 })

//                 return done(null, user);
//             } catch (error) {
//                 done(error)
//             }
//         }
//     )
// );

// passport.use(
//     'login',
//     new localStrategy(
//         {
//             usernameField: 'email',
//             passwordField: 'password'
//         },

//         async (email, password, done) => {
//             try {
//                 const user = await userModel.findOne({email})

//                 if (!user) {
//                     return done(null, false, {message: 'User not found'})
//                 }

//                 const validate = await user.isValidCredential(password);

//                 if (!validate) {
//                     return done(null, false, {message: 'Wrong Password'})
//                 }

//                 return done(null, user, {
//                     message: 'Logged in Successfully'
//                 })
//             } catch (error) {
//                 return done(error);
//             }
//         }
//     )
// )

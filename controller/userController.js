const passport = require('passport');
const helper = require('../utils/helper');


exports.signup = passport.authenticate('signup', { session: false }), async (req, res, next) => {
        console.log(req.user)
        res.status(201).json({
            message: 'Signup successful',
            user: req.user
        });
}


exports.login = async (req, res, next) => {
        passport.authenticate('login', async (err, user, info) => {
            try {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    const error = new Error('Username or password is incorrect');
                    return next(error);
                }
                

                req.login(user, { session: false },
                    async (error) => {
                        if (error) return next(error);

                        const body = { _id: user._id, email: user.email };
                        const token = helper.jwtSignToken({user: body})

                        return res.json({ token });
                        
                    }
                    
                );
            } catch (error) {
                return next(error);
            }
        }
        )(req, res, next);
};





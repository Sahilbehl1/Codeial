const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID: "913789926915-e117ej7n9f8fs8neoq2p273blnd9hnk6.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback" // ye humne hi set kara tha authorized redirect url mein while making credential
    },

    function(accessToken,refreshToken,profile,done){     // refresh token is needed if access token get expired 
        // find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){console.log('error in google strategy passport',err);return}

            console.log(profile);

            if(user){
                // if found set this user as req.user(means sign-in that user)
                return done(null,user);
            }else{// if user not exist then create the user 
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex') 
                },function(err,user){
                    if(err){console.log('error in creating user',err);return} 

                    return done(null,user);
                });
            }
        });
    }    
));

module.exports = passport;
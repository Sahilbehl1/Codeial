const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;  // to extract jwt from data

const User = require('../models/user');


let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeial'
} 


passport.use(new JWTStrategy(opts,function(jwtPayLoad,done){

    User.findById(jwtPayLoad._id,function(err,user){
        if(err){
            console.log('Error in finding user from JWT');
            return;
        }
        if(user){
            return done(null,user);
        }else{
            return done(null,false);  
        }
    })
}));
// then install jsonwebtoken => npm install jsonwebtoken

module.exports = passport;

// finally go to postman and select POST and type localhost:8000/api/v1/users/create-session then go to Body then to x-www-form-urlencoded then click on key and write email and on value write the email which exist in your workspace then create another key by name of password and then type password and click on Send then it will generate a token and u will see three dots in token that is header payload and signature


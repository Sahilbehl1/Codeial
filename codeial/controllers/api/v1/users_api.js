const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
// our idea is to find the user and create a web token 

module.exports.createSession = async function(req, res){
    try {
        let user = await User.findOne({email: req.body.email});


        if(!user || user.password != req.body.password){
            return res.json(422,{
                message: "Invalid username or password"
            });
        }
        return res.json(200,{
            message: "Sign in successfully,here is your token,please keep it safe!",
            data:{
                token: jwt.sign(user.toJSON(),'codeial',{expiresIn: '100000'}) // codeial is our secretOrKey
            }
        })

    } catch (err) {
        console.log('******',err);
        return res.json(500,{
            message: "Internal server error"
        });
    }
}
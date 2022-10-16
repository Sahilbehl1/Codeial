const User = require('../models/user');
const fs = require('fs'); // this is needed to delete the avatar
const path = require('path');


module.exports.profile = function(req, res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    });
}

// module.exports.update = function(req,res){
//     if(req.user.id == req.params.id){      //ye check karna pad raha hain kyoki agar kisi ne inspect karke id change kardi to vo uska bhi data acess kar sakta hain
//         User.findByIdAndUpdate(req.params.id,req.body,function(err,sser){
//             return res.redirect('back');
//         })
//     }else{
//         return res.status(401).send('Unauthorized');   // there are http status codes see net in wikipedia
//     }                                  
// }//
// converting to async await
module.exports.update = async function(req,res){
    if(req.user.id == req.params.id){      //ye check karna pad raha hain kyoki agar kisi ne inspect karke id change kardi to vo uska bhi data acess kar sakta hain
        try {
            // find the user first 
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('******Multer Error',err);
                }
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                    // this is saving the path of the uploaded file into the avatar field
                    user.avatar = User.avatarPath + '/' + req.file.filename
                }
                user.save();   // isse hoga ki jo tumne avatars ka folder bnaya tha usme saari pics aa jaingi 
                return res.redirect('back');
            });
        } catch (error) {
            req.flash('error',err);
            return res.redirect('back');
        }
    }else{
        req.flash('error','Unauthorized!');
        return res.status(401).send('Unauthorized');   // there are http status codes see net in wikipedia
    }                                  
}//


// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res,next){
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('error','You have logged out!');
        res.redirect('/');
      });

}
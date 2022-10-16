const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = async function(req, res){
    try{

        let posts=  await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }  
        })
       
        let users = await User.find({})
    
        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts,
            all_users:users
        });
    }catch(err){
        console.log("Error ",err);
        return;
    }
}    
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts:  posts
    //     });
    // });

    // populate the user of each post
     


    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts:  posts
    //     });
    // });

    // populate the user of each post
    

// run upar vaale se bhi kar raha hain but ab hum async wait ka use kar rahe hain that means ki jab tak ek part nhi execute hota tabh tak agle part ko wait karna padega this is good as ek sucess response throw karega to vo posts ya users mein store hojaega but this is not working idk why
// module.exports.home = async function (req, res) {

// try {
//     let posts = Post.find({})
//         .populate('user')
//         .populate({
//             path: 'comments',
//             populate: {
//                 path: 'user'
//             }
//         });
//     let users = await User.find({});

//     return res.render('home', {
//         title: "Codeial | Home",
//         posts: posts,
//         all_users: users
//     });
// } catch (err) {
//     console.log('Error', err);
//     return;
// }
// }

// module.exports.actionName = function(req, res){}

// using then 
// Post.find({}).populate('comments').then(function());


// using exec
// let posts = Post.find({}).populate('comments').exec();
// posts.then();
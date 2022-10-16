const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req, res){


    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

    return res.json(200, {
        message: "List of posts",
        posts: posts
    })
}

module.exports.destroy = function(req,res){   // to delete a post
    try{
        let post = Post.findById(req.params.id);     // finding the particular post to be deleted
            if(post.user == req.user.id) {   // this is that ki ab jisne post kara hain uske pass hi rights hone chaiye na delete karne ke so we are comparing the ids and here   .id isliye kara taaki string mein convert ho jae varna req.user dekhoge post.js mein to vo merko id hi laake de raha hain
                post.remove();
    
                Comment.deleteMany({post: req.params.id});
                return res.json(200,{
                message: "Post and associated comments deleted successfully"
                });
            }else{
                return res.json(401,{
                    message: 'You cannot delete this post'
                })  
            }                   
    }catch(err){
        console.log('******',err);
        return res.json(500,{
            message: "Internal Server Error"
        });
    }       
    
}    
// module.exports.destroy = function(req,res){   // to delete a post
//     try{
//         let post = Post.findById(req.params.id);     // finding the particular post to be deleted
//             // if(post.user == req.user.id) {   // this is that ki ab jisne post kara hain uske pass hi rights hone chaiye na delete karne ke so we are comparing the ids and here   .id isliye kara taaki string mein convert ho jae varna req.user dekhoge post.js mein to vo merko id hi laake de raha hain
//                 post.remove();
    
//                 Comment.deleteMany({post: req.params.id});
//             // }else{
//                 return res.json(200,{
//                     message: "Post and associated comments deleted successfully"
//                 });                 
//     }catch(err){
//         console.log('******',err);
//         return res.json(500,{
//             message: "Internal Server Error"
//         });
//     }       
    
// }    

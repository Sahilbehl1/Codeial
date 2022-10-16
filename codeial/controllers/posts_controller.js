const Post = require('../models/post');
const Comment = require('../models/comment'); // acessing the comments to delete it
// module.exports.create = function(req, res){
//     Post.create({
//         content: req.body.content,
//         user: req.user._id
//     }, function(err, post){
//         if(err){console.log('error in creating a post'); return;}

//         return res.redirect('back');
//     });
// }
// converting upper code to async await
module.exports.create = async function(req, res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        }); 
        if(req.xhr){  // checking that is it ajax request for this we have xhr   (XMLhttp)
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post Created!"
            });
             
        }

        req.flash('success','Post published Successfully!');
        return res.redirect('back');
    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
}

module.exports.destroy = function(req,res){   // to delete a post
        Post.findById(req.params.id,function(err,post){     // finding the particular post to be deleted
            if(post.user == req.user.id) {   // this is that ki ab jisne post kara hain uske pass hi rights hone chaiye na delete karne ke so we are comparing the ids and here   .id isliye kara taaki string mein convert ho jae varna req.user dekhoge post.js mein to vo merko id hi laake de raha hain
                post.remove();
    
                Comment.deleteMany({post: req.params.id},function(err){
                    if(req.xhr){
                        return res.status(200).json({
                            data:{
                                post_id:req.params.id
                            },
                            message: "Post deleted!"
                        })
                    }
                    req.flash('success','Post and associated comments deleted!');
                    return res.redirect('back');
                })
            }else{
                req.flash('error','You cannot delete this post');
                return res.redirect('back');
            }                  
        });
    // }err){
    //     req.flash('error',err);
    //     return res.redirect('back');
    // }       
    
}                 
// converting upper code to async await
// module.exports.destroy = async function(req,res){         // to delete a post
//     try{
//         if(post.user == req.user.id) {   // this is that ki ab jisne post kara hain uske pass hi rights hone chaiye na delete karne ke so we are comparing the ids and here   .id isliye kara taaki string mein convert ho jae varna req.user dekhoge post.js mein to vo merko id hi laake de raha hain
//             post.remove();

//             await Comment.deleteMany({post: req.params.id});
//             return res.redirect('back');
//         }else{
//             return res.redirect('back');
//         }  
//     }catch(err){
//         console.log('Error',err);
//         return;
//     } 
// }
                
// module.exports.destroy = async function(req, res){

//     try{
//         let comment = await Comment.findById(req.params.id);

//         if (comment.user == req.user.id){

//             let postId = comment.post;

//             comment.remove();

//             let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

//             // send the comment id which was deleted back to the views
//             if (req.xhr){
//                 return res.status(200).json({
//                     data: {
//                         comment_id: req.params.id
//                     },
//                     message: "Post deleted"
//                 });
//             }


//             req.flash('success', 'Comment deleted!');

//             return res.redirect('back');
//         }else{
//             req.flash('error', 'Unauthorized');
//             return res.redirect('back');
//         }
//     }catch(err){
//         req.flash('error', err);
//         return;
//     }
    
// }
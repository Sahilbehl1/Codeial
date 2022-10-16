const Comment = require('../models/comment');
const Post = require('../models/post');

// module.exports.create = function(req, res){
//     Post.findById(req.body.post, function(err, post){

//         if (post){
//             Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             }, function(err, comment){
//                 if(err){console.log('error in posting the comment');return;};
//                 post.comments.push(comment);
//                 post.save();

//                 res.redirect('/');
//             });
//         }

//     });
// }
module.exports.create = async function (req, res) {
    try {
        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();
            if(req.xhr){  // checking that is it ajax request for this we have xhr   (XMLhttp)
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Comment Created!"
                });
            }
            req.flash('success','Comment published Successfully!');
            res.redirect('/');
        }
    } catch (err) {
        req.flash('error',err);
        return res.redirect('back');
    }
}
module.exports.destroy = function (req, res) {
    Comment.findById(req.params.id, function (err, comment) {
        if (comment.user == req.user.id || post.user.id == req.user.id) {
            let postId = comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }, function (err, post) {
                if(req.xhr){
                    return res.status(200).json({
                        data:{
                            comment_id:req.params.id
                        },
                        message: "comment deleted!"
                    })
                }
                req.flash('success','Your Comment gets deleted!');
                return res.redirect('back');
            })
        } else {
                req.flash('error','You cannot delete this comment');
                return res.redirect('back');
        }
    })
}

const mongoose = require('mongoose');
// left friends and likes module
const friendshipSchema = new mongoose.Schema({ 
    // user who sent the request
    from_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // user who accepted the request
    to_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
});

const Friendship = mongoose.model('Friendship',friendshipSchema);
module.exports = Friendship;
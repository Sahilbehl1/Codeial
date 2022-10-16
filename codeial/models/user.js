const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {                    // this is the schema of uploading the image  
        type: String
    },
    friendships: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Friendship'
        }
    ]
   
}, {
    timestamps: true
});

 // hum filename ke saath saath current time in milliseconds bhi dege kyoki dekho data to ek jagah store ho raha hain and ab agar same file name ho to maybe merko koi aur photo mil jae to mein current time bhi store karunga this is called   epoc time   =>

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH))  
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
});


// static functions so that i can use it in another js file
userSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');   // single means ki only one file hi jaigi by name of avatar
userSchema.statics.avatarPath = AVATAR_PATH


const User = mongoose.model('User', userSchema);

module.exports = User;
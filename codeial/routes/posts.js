const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsController = require('../controllers/posts_controller');

router.post('/create', passport.checkAuthentication, postsController.create);
router.get('/destroy/:id',passport.checkAuthentication,postsController.destroy); // to check the user which exist can delete his post only  
// noy go to views and create delete button

module.exports = router;
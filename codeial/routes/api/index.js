const express = require('express');

const router = express.Router();

router.use('/v1',require('./v1'));

module.exports = router;
//these lines are required if there is  Router.use() requires a middleware function but got a Object error in js file jha pe ye particular file ko hum include kar rahe ho
// const express = require('express');

// const router = express.Router();

// module.exports = router;

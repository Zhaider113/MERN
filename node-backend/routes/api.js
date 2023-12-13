var express     = require('express'),
    router      = express.Router();

// ROUTES
const   user           = require('./user'),
        post            = require('./post');

router.use('/api/user', user);
router.use('/api/post', post);

module.exports = router;



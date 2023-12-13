const   express         = require('express'),
        router          = express.Router();

const { userController } = require('../controllers');

// register email with validators
router.post('/register', async (req, res) => {
    return userController.register(req, res);
});

// login user email with validators
router.post('/login', async (req, res) => {
    return userController.login(req, res);
});


module.exports = router;
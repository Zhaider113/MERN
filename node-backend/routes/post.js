const   express         = require('express'),
        router          = express.Router();
const auth      = require('../middleware/auth');  
const { postController } = require('../controllers');

// get user posts 
router.get('/list',auth, async (req, res)=>{
    return postController.getData(req, res);
});

// Post data to DB
router.post('/add',auth, async (req, res) => {
    return postController.postData(req, res);
});

// Update Record
router.post('/update/:id',auth, async (req, res) => {
    return postController.updatePost(req, res);
});

// Delete Record
router.get('/delete/:id',auth, async (req, res) => {
    return postController.deletePost(req, res);
});

// get All User posts 
router.get('/allPost',auth, async (req, res)=>{
    return postController.getAllPosts(req, res);
});

// View Record
router.get('/:id', async (req, res) => {
    return postController.viewPost(req, res);
});

module.exports = router;
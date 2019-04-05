const router = require('express').Router();
const controller = require('./controller');

//new post
router.post('/newPost', (req, res) => {
	controller.createPost(req, res);
});

//edit Post
router.put('/editPost/:id', (req, res) => {
	controller.editPost(req, res);
});

//delete post
router.put('/deletePost/:id', (req, res) => {
	controller.removePost(req, res);
});

//fetch all post
router.get('/getPosts/:school', (req, res) => {
	controller.getPosts(req, res);
});

//like post
router.put('/likePost/:id', (req, res) => {
	controller.likePost(req, res);
});

//fetch all post from a specific user
router.get('/userPosts/:user', (req, res) => {
	controller.getUserPosts(req, res);
});


module.exports = router;

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
router.put('/deletePost/:postid', (req, res) => {
	controller.removePost(req, res);
});

//fetch all post
router.get('/getAllPosts', (req, res) => {
	controller.getPosts(req, res);
});


module.exports = router;

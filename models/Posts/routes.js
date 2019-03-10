const router = require('express').Router();
const controller = require('./controller');

//new post
router.post('/post/create', (req, res) => {
	controller.createPost(req, res);
});

module.exports = router;

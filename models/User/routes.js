const router = require('express').Router();
const controller = require('./controller');

//sign up
router.post('/register', (req, res) => {
	controller.createUser(req, res);
});

//sign in
router.post('/login', (req, res) => {
	controller.findUser(req, res);
});

//edit profile
router.put('/user/:id/editProfile', (req, res) => {
	controller.editProfile(req, res);
});

//update profile image
router.put('/user/:id/uploadImage', (req, res) => {
	controller.profileImage(req, res);
});

module.exports = router;

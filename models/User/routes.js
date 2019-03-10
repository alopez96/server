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

module.exports = router;

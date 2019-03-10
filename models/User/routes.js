const router = require('express').Router();
const controller = require('./controller');

router.post('/register', (req, res) => {
	controller.createUser(req, res);
});

router.post('/login', (req, res) => {
	controller.findUser(req, res);
});


router.get('/', (req, res) => {
    res.send('this is working');
})

module.exports = router;
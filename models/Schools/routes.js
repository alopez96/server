const router = require('express').Router();
const controller = require('./controller');

//new school
router.post('/newSchool', (req, res) => {
	controller.newSchool(req, res);
});

//get schools
router.get('/getSChool/:category', (req, res) => {
	controller.getSchools(req, res);
});

module.exports = router;
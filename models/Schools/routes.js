const router = require('express').Router();
const controller = require('./controller');

//new school
router.post('/newSchool', (req, res) => {
	controller.newSchool(req, res);
});

//get schools
router.get('/getSChools/:category', (req, res) => {
	controller.getSchools(req, res);
});

//get schools
router.get('/school/:name', (req, res) => {
	controller.findSchool(req, res);
});

module.exports = router;
const router = require('express').Router();
const controller = require('./controller');

//new sale
router.post('/newSale', (req, res) => {
	controller.newSale(req, res);
});

//get all items within school
router.get('/getSales/:schoolid', (req, res) => {
	controller.getAllItems(req, res);
});

//get items with keyword
router.get('/getSales/:schoolid/:keyword', (req, res) => {
	controller.getItems(req, res);
});

//get items within category
router.get('/getSalesCategory/:schoolid/:category', (req, res) => {
	controller.getCategory(req, res);
});

//edit sale
router.put('/editSale/:id', (req, res) => {
	controller.editSale(req, res);
});

//mark item as sold
router.put('/sales/:id/markSold', (req, res) => {
	controller.markSold(req, res);
});

//delete sale item from list
router.put('/sales/:id/removeSale', (req, res) => {
	controller.removeSale(req, res);
});

//get list of categories
router.get('/getCategories/:schoolid', (req, res) => {
	controller.getListOfCategories(req, res);
});

module.exports = router;
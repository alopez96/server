const router = require('express').Router();
const controller = require('./controller');

//new sale
router.post('/newSale', (req, res) => {
	controller.newSale(req, res);
});

//get all items
router.get('/getSales', (req, res) => {
	controller.getAllItems(req, res);
});

//get items
router.get('/getSales/:keyword', (req, res) => {
	controller.getItems(req, res);
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

module.exports = router;
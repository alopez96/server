const Sale = require('./model'); 
const mongoose = require('mongoose');

//new sale
exports.newSale = (req, res) => {
  // destructure the req.body
  const { title, description, category, schoolid, userid,
     image, postDate, lastEditDate, sold } = req.body;
  if (title && category) {
    // create new sale
    let newSaleItem = new Sale({
      title, description, category, schoolid, userid, image,
      postDate, lastEditDate, sold
      });
      //save new sale to db
      newSaleItem.save()
        .then(sale => res.status(200).json(sale))
        .catch( err => { res.status(400).json(err)})
  } else {
    return res.status(400).json({ 'Error': 'Missing fields' });
  }
};

//fetch all items within school
exports.getAllItems = (req, res) => {
	const { schoolid } = req.params;
	Sale.find({schoolid: schoolid}).sort({postDate: -1})
	.populate('userid', 'name email imageurl').then((sale) => {
    if (!sale) {
      return res.status(400).json({ 'Error': 'Item does not exist' });
    } else {
      res.json(sale);
    }
	})
	.catch( err => { res.status(400).json(err)});
}

//find items based on keyword
exports.getItems = (req, res) => {
	const { schoolid, keyword } = req.params;
	//query database matching keyword with title, desc, or category
  Sale.find({$and: [{$or : [
		{title:{'$regex' : keyword, '$options' : 'i'}},
		{description:{'$regex' : keyword, '$options' : 'i'}},
		{category:{'$regex' : keyword, '$options' : 'i'}}]
	}, {schoolid: schoolid}]}).sort({postDate: -1})
	.populate('userid', 'name email imageurl')
	.then((sale) => {
    if (!sale) {
      return res.status(400).json({ 'Error': 'Item does not exist' });
    } else {
      res.json(sale);
    }
	})
	.catch( err => { res.status(400).json(err)});
}

//find items within category
exports.getCategory = (req, res) => {
	const { schoolid, category } = req.params;
	//query database matching keyword with title, desc, or category
	Sale.find({$and: 
		[{category:{'$regex' : category, '$options' : 'i'}},
		{schoolid: schoolid}]}).sort({postDate: -1})
	.populate('userid', 'name email imageurl')
	.then((sale) => {
    if (!sale) {
      return res.status(400).json({ 'Error': 'Item does not exist' });
    } else {
      res.json(sale);
    }
	})
	.catch( err => { res.status(400).json(err)});
}


//edit sale
exports.editSale = (req, res) => {
  const { id } = req.params;
  const { title, description, category, userid,
     image, lastEditDate } = req.body;
  //find sale, and update
	Sale.findById(id).then((sale) => {
		//only modify if user matches user who created sale item
		if (sale.userid == userid) {
			let updatedSale = {
        title, description, category, 
     		image, lastEditDate
			};

			Sale.findByIdAndUpdate(
				mongoose.Types.ObjectId(id),
				{ $set: updatedSale },
				{ new: true }
			).then((sale) => {
				Sale.findById(sale._id).populate('images').then((sale) => {
					if (sale)
						return res.status(201).json({ 'sale': sale });
					else
						return res.status(400).json({ 'err': 'err' })
				}).catch(err => console.log(err));
			})
		}
		else {
			return res.status(400).json({ 'err': 'err' })
		}

	}).catch(err => console.log(err));
}

//mark item as sold
exports.markSold = (req, res) => {
  const { id } = req.params;
  Sale.findOneAndUpdate(
		{$and: [{ _id: id}, {userid: userid}]}, 
		{ $set: { 'sold': true } })
  .then((sale) => {
		if (!sale) {
			return res.status(404).json({ 'Error': 'error', 'sold': null });
		} else {
			return res.status(201).json({ 'sold': true });
		}
	});
}

//remove item from sale list
exports.removeSale = (req, res) => {
	const { id } = req.params;
	const { userid } = req.body;
  Sale.deleteOne({$and: [{ _id: id}, {userid: userid}]})
  .then((response) => {
		if (!response) {
			return res.status(404).json({ 'Error': 'error', 'sold': null });
		} else {
			return res.status(201).json({ 'deleted': response.deletedCount });
		}
  })
  .catch(err => res.status(400).json(err));
}

//get list of categories
exports.getListOfCategories = (req, res) => {
	const { schoolid } = req.params;
	//query database to find categories
	//use distict to avoid duplicate category entries
	Sale.find({schoolid: schoolid}).distinct('category')
	.then((sale) => {
    if (!sale) {
      return res.status(400).json({ 'Error': 'Item does not exist' });
    } else {
      res.json(sale);
    }
	})
	.catch( err => { res.status(400).json(err)});
}
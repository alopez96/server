const Sale = require('./model'); 
const mongoose = require('mongoose');

//new school
exports.newSale = (req, res) => {
  // destructure the req.body
  const { title, description, category, schoolid, userid,
     images, postDate, lastEditDate, sold } = req.body;
  if (title && category) {
    // create new sale
    let newSaleItem = new Sale({
      title, description, category, schoolid, userid, images,
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

//fetch all items
exports.getAllItems = (req, res) => {
  Sale.find().then((sale) => {
    if (!sale) {
      return res.status(400).json({ 'Error': 'Item does not exist' });
    } else {
      res.json({ sale });
    }
	})
	.catch( err => { res.status(400).json(err)});
}

//fetch sale items
exports.getItems = (req, res) => {
	const { keyword } = req.params;
	//query database matching keyword with title, desc, or category
  Sale.find({$or : [
		{title:{'$regex' : keyword, '$options' : 'i'}},
		{description:{'$regex' : keyword, '$options' : 'i'}},
		{category:{'$regex' : keyword, '$options' : 'i'}}]
	})
		.then((sale) => {
    if (!sale) {
      return res.status(400).json({ 'Error': 'Item does not exist' });
    } else {
      res.json({ sale });
    }
	})
	.catch( err => { res.status(400).json(err)});
}


//edit sale
exports.editSale = (req, res) => {
  const { id } = req.params;
  const { title, description, category, schoolid, userid,
     images, postDate, lastEditDate, sold } = req.body;
  //find sale, and update
	Sale.findById(id).then((sale) => {
		//only modify if user matches user who created sale item
		if (sale.userid == userid) {
			let updatedSale = {
        title, description, category, schoolid, 
        images, postDate, lastEditDate, sold
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
  Sale.findOneAndUpdate({ _id: id }, { $set: { 'sold': true } })
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
  Sale.deleteOne({ _id: id })
  .then((response) => {
		if (!response) {
			return res.status(404).json({ 'Error': 'error', 'sold': null });
		} else {
			return res.status(201).json({ 'deleted': true });
		}
  })
  .catch(err => res.status(400).json(err));
}
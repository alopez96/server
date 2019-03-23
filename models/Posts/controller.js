const Post = require('./model');
const mongoose = require('mongoose');

//new post to mongoDB
exports.createPost = (req, res) => {
  // destructure the req.body
  const { user, school, body, imageurl, postDate } = req.body;
  if (user && school && body) {
    // create new post
    let newPost = new Post({
      user, school, body, imageurl, postDate
      });
      //save new post to db
      newPost.save()
        .then(post => res.status(200).json(post))
        .catch( err => { res.status(400).json(err)})
  } else {
    return res.status(400).json({ 'Error': 'Missing fields' });
  }
};

//edit post
exports.editPost = (req, res) => {
  const { id } = req.params;
  const { user, body, imageurl, editDate } = req.body;
  //find post, and update
	Post.findById(id).then((post) => {
		//only modify if user matches user who created sale item
		if (post.user == user) {
			let updatedPost = {
        user, body,
        imageurl, editDate
			};
			Post.findByIdAndUpdate(
				mongoose.Types.ObjectId(id),
				{ $set: updatedPost },
				{ new: true }
			).then((post) => {
        if (post)
						return res.status(201).json({ 'post': post });
					else
						return res.status(400).json({ 'err': 'err' })
			}).catch(err => console.log(err));
		}
		else {
			return res.status(400).json({ 'err': 'err' })
		}

	}).catch(err => console.log(err));
}

//delete post from db
exports.removePost = (req, res) => {
	const { id } = req.params;
  const { user } = req.body;
  console.log(id, user)
  Post.deleteOne({$and: [{ _id: id}, {user: user}]})
  .then((response) => {
		if (response) {
      //return success
			return res.status(200).json({ 'deleted': response.deletedCount });
		} else {
      //return error
			return res.status(404).json({ 'Error': 'error', 'post': null });
		}
  })
  .catch(err => res.status(400).json(err));
}

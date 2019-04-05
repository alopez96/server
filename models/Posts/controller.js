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
        .then(post => res.status(200).json({post}))
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
						return res.status(200).json({ 'post': post });
					else
						return res.status(400).json({ 'err': 'err' })
			}).catch(err => console.log(err));
    }
    //user does not have access to edit
		else {
			return res.status(400).json({ 'err': 'user is not valid' })
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

//fetch all posts
exports.getPosts = (req, res) => {
	const { school } = req.params;
	Post.find({school: school}).sort({postDate: -1})
	.populate('user', 'name email imageurl').then((post) => {
    if (post) {
      //successful
      res.json(post);
    } else {
      //error
      return res.status(400).json({'error': post});
    }
	})
	.catch( err => { res.status(400).json(err)});
}

//like post
exports.likePost = (req, res) => {
  //get postid
  const { id } = req.params;
  //deconstruct the body to get userid
  const { user } = req.body;
  //find post, and update
  Post.findByIdAndUpdate(mongoose.Types.ObjectId(id))
  .then((post) => {
    if(post){
      //get list of likes
      var currentLikes = post.likeList;
      //check if the user has already liked
      var hasLiked = currentLikes.some(function (liked) {
				return liked.equals(user);
      });
      //user has liked -> remove user from likeList
			if (currentLikes.length > 0 && hasLiked) {
        Post.findOneAndUpdate(
					{ _id: id },
					{ $pull: { likeList: mongoose.Types.ObjectId(user) } },
					{ new: true, upsert: true },
					function (error, event) {
						if (error) {
							console.log(error);
						} else {
							return res.status(200).json({ event });
						}
					});
      } else {
        //user has not liked -> add user to likeList
				Post.findOneAndUpdate(
					{ _id: id },
					{ $push: { likeList: mongoose.Types.ObjectId(user) } },
					{ new: true, upsert: true },
					function (error, event) {
						if (error) {
							return res.status(400).json({'error': error})
						} else {
							return res.status(200).json({ event });
						}
					});
      }
    }
    else
      return res.status(400).json({ 'err': 'err' })
  }).catch(err => console.log(err));
}


//fetch all posts from a specific user
exports.getUserPosts = (req, res) => {
	const { user } = req.params;
	Post.find({user: user}).sort({postDate: -1})
	.then((posts) => {
    if (posts) {
      //successful
      res.json(posts);
    } else {
      //error
      return res.status(400).json({'error': posts});
    }
	})
	.catch( err => { res.status(400).json(err)});
}
const User = require('./model'); 
const bcrypt = require('bcrypt');

//new post to mongoDB
exports.createPost = (req, res) => {
  // destructure the req.body
  const { user, category, description, imageurl, postDate } = req.body;
  if (user && description) {
    // create new post
    let newPost = new User({
        user: user,
        category,
        description: description,
        imageurl: imageurl,
        postDate: postDate
      });
      //save new post to db
      newPost.save()
        .then(post => res.status(200).json(post))
        .catch( err => { res.status(400).json(err)})
  } else {
    return res.status(400).json({ 'Error': 'Missing fields' });
  }
};

//fetch all posts

//find posts on keyword search

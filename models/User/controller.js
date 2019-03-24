const User = require('./model'); 
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const saltRound = 12;

//register a new user to mongoDB
exports.createUser = (req, res) => {
  // Destructuring the req.body
  const { name, email, password, joined } = req.body;
  if (name && email && password) {
    User.findOne({ email: email }).then((user) => {
      if (user) { // If the user already exists, reject duplicate account
        return res.status(400).json({ 'Error': 'User already exists' });
      } else {
        // Creates a new User
        let newUser = new User({
          name: name,
          email: email,
          password: password,
          joined: joined
        });

        // Hashes the user's password
        bcrypt.hash(password, saltRound, function (err, hash) {
          if (err) throw err;
          newUser.password = hash;
          // Push new user onto db if successful, else display error
          newUser.save()
          .then(user => res.json(user))
          .catch( err => { res.status(400).json('error getting user')})
        });
      }
    });
  } else {
    return res.status(400).json({ 'Error': 'Missing fields' });
  }
};

//find user for login
exports.findUser = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }).then((user) => {
    //validate username and password
    if (!user) {
      return res.status(400).json({ 'Error': 'User does not exist' });
    } else {
      bcrypt.compare(password, user.password).then(same => {
        //email and password are correct, send success token to server
        if (same) {
            res.json({ success: true, user });
        } else {
          return res.status(400).json({ 'Error': 'Password is incorrect' });
        }
      }).catch((err) => console.log(err));
    }
  });
}

//edit profile
exports.editProfile = (req, res) => {
  const { id } = req.params;
  const { name, email, bio } = req.body;
  //find sale, and update
	User.findById(id).then((profile) => {
		if (profile) {
			let updatedProfile = {
        name, email, bio
      };

			User.findByIdAndUpdate(
				mongoose.Types.ObjectId(id),
				{ $set: updatedProfile },
				{ new: true }
			).then((user) => {	
					if (user)
						return res.status(200).json({ 'user': user });
					else
						return res.status(400).json({ 'err': 'err' })
				}).catch(err => console.log(err));
		}
		else {
			return res.status(400).json({ 'err': 'err' })
		}

	}).catch(err => console.log(err));
}


exports.profileImage = (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id },
     { $set: { "imageurl": req.body.imageurl } })
  .then((user) => {
		if (!user) {
			return res.status(404).json({ 'Error': 'error', 'imageurl': null });
		} else {
			return res.status(200).json({ 'imageurl': req.body.imageurl });
		}
	});
};


//get user info
exports.getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id).then((profile) => {
    if(profile){
      return res.status(200).json(profile)
    }
    else{
      return res.status(400).json('error')
    }
  })
}
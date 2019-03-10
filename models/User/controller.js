const User = require('./model'); 
const bcrypt = require('bcrypt');

const numberOfSaltIterations = 12;

//register a new user to mongoDB
exports.createUser = (req, res) => {
  // Destructuring the req.body
  const { name, email, password } = req.body;
  if (name && email && password) {
    User.findOne({ email: email }).then((user) => {
      if (user) { // If the user already exists, reject duplicate account
        return res.status(400).json({ 'Error': 'User already exists' });
      } else {
        // Creates a new User
        let newUser = new User({
          name: name,
          email: email,
          password: password
        });

        // Hashes the user's password
        bcrypt.hash(password, numberOfSaltIterations, function (err, hash) {
          if (err) throw err;
          newUser.password = hash;
          // Push new user onto db if successful, else display error
          newUser.save().then(user => 
            res.status(201).json({ 'user': user }))
            .catch(err => console.log(err));
        });
      }
    });
  } else {
    return res.status(400).json({ 'Error': 'Missing fields' });
  }
};

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

const School = require('./model'); 
const bcrypt = require('bcrypt');

//new school
exports.newSchool = (req, res) => {
  // destructure the req.body
  const { name, category, location, phoneNumber, logourl } = req.body;
  if (name && category) {
    // create new school
    let newSchool = new School({
        name,
        category,
        location,
        phoneNumber,
        logourl
      });
      //save new school to db
      newSchool.save()
        .then(school => res.status(200).json(school))
        .catch( err => { res.status(400).json(err)})
  } else {
    return res.status(400).json({ 'Error': 'Missing fields' });
  }
};


//get schools based on category
exports.getSchools = (req, res) => {
  const { category } = req.params;
  School.find({ category: category }).then((school) => {
    if (!school) {
      return res.status(400).json({ 'Error': 'school does not exist' });
    } else {
      res.json( school );
    }
    }).catch((err) => console.log(err));
}

//find school with keyword match
exports.findSchool = (req, res) => {
  const { name } = req.params;
  School.find({name:{'$regex' : name, '$options' : 'i'}}).then((school) => {
    if (!school) {
      return res.status(400).json({ 'Error': 'school does not exist' });
    } else {
      res.json({ school });
    }
    }).catch((err) => console.log(err));
}
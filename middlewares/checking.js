const User = require('../models/users'); 
async function checkUser(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(404).send("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
}

module.exports = checkUser;

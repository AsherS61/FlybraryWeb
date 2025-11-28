const User = require('../models/User.js');

//@desc Register user
//@route POST /api/v1/auth/register
//@access Public
exports.register = async (req, res, next) => {
  try {
    const { name, password, role } = req.body;

    // Create User
    const user = await User.create({
      name,
      lineId,
      role
    });

    sendTokenResponse(user, 200, res); // Create token
  } catch (err) {
    res.status(400).json({ success: false, message: "bad req" });
    console.log(err);
  }
};
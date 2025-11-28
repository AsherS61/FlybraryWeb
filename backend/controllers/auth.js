const User = require('../models/User.js');

//@desc Register user
//@route POST /api/v1/auth/register
//@access Public
exports.register = async (req, res, next) => {
  try {
    const { name, role } = req.body;

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

export async function getMyProfile(req, res) {
  return res.json({
    id: req.user.id,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role
  });
}

//@desc Register user
//@route POST /api/v1/auth/register
//@access Public
exports.
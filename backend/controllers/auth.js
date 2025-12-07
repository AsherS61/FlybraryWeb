const User = require('../models/User.js');

//@desc Login user
//@route POST /api/v1/auth/login
exports.login = async (req, res, next) => {
  try {
    const {displayName, picture, lineId} = req.body;
    const user = await User.findOne({
      lineId: lineId
    });
    if (user) {
      return res.status(200).json({
        success: true,
        data: user
      });
    }
    const created_user = await User.create({
      name:displayName,
      lineId:lineId,
      profile:picture,
      role:'user'
    });

    if (created_user) {
      return res.status(200).json({
      success: true,
      data: created_user
      })
    }

  } catch (err) {
    res.status(400).json({success: false, message: "bad req"});
    console.log(err);
  }
}
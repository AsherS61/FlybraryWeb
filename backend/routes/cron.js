const express = require("express");
const router = express.Router();
const axios = require("axios");
const Transaction = require("../models/Transaction");
const User = require("../models/User");

async function sendLineMessage(userId, message) {
  try {
    await axios.post(
      "https://api.line.me/v2/bot/message/push",
      {
        to: userId,
        messages: [{ type: "text", text: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.log("LINE send error:", err.response?.data || err.message);
  }
}

router.get("/check-return", async (req, res) => {
  try {
    const now = new Date();
    const next24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const dueSoon = await Transaction.find({
      returnBy: { $gte: now, $lte: next24h },
      notified: { $ne: true },
    });

    for (const trx of dueSoon) {
      const user = await User.findById(trx.userId);
      if (!user?.lineId) continue;

      const msg = `📢 Reminder: Your borrowed item is due soon.\nReturn by: ${trx.returnBy.toLocaleString()}`;
      await sendLineMessage(user.lineId, msg);

      trx.notified = true;
      await trx.save();
    }

    return res.json({ success: true, checked: dueSoon.length });
  } catch (err) {
    console.log("CRON ERROR:", err);
    return res.status(500).json({ success: false });
  }
});

module.exports = router;

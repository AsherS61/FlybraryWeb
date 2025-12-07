const axios = require("axios");
const Transaction = require("../models/Transaction");

const sendLineMessage = async (userId, message) => {
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
      console.log("LINE API error:", err.response?.data || err.message);
    }
  };
  
exports.checkReturn = async (req, res) => {
try {
    const now = new Date();
    const next24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const dueSoon = await Transaction.find({
    returnBy: {
        $gte: now,
        $lte: next24h,
    }}).populate('user');

    for (const trx of dueSoon) {

        if (!trx?.user?.lineId) continue;
        const message = `Reminder: Your borrowed item is due in less than 24 hours.\nReturn by: ${trx.returnBy.toLocaleString()}`;
        console.log(`Sending reminder to user ${trx.user.name} (LINE ID: ${trx.user.lineId}) for transaction due by ${trx.returnBy.toLocaleString()}`);

        const msgRes = await sendLineMessage(trx.user.lineId, message);
        console.log(`LINE API response for user ${trx.user.name}:`, msgRes);
    }

    return res.status(200).json({
        success: true,
        checkouted: dueSoon.length
    });
} catch (err) {
    console.log("Cron error:", err.message);
    return res.status(500).json({ success: false });
}
}
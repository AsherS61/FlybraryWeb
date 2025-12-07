import axios from "axios";
import Transaction from "../../../models/Transaction";

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

export default async function handler(req, res) {
  try {
    const now = new Date();
    const next24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const dueSoon = await Transaction.find({
      returnBy: {
        $gte: now,
        $lte: next24h,
      }
    }).populate('user');

    for (const trx of dueSoon) {

      if (!trx?.user?.lineId) continue;

      const message = `Reminder: Your borrowed item is due in less than 24 hours.\nReturn by: ${trx.returnBy.toLocaleString()}`;

      await sendLineMessage(trx.user.lineId, message);
    }

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log("Cron error:", err.message);
    return res.status(500).json({ success: false });
  }
}

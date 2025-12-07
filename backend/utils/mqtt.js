const mqtt = require("mqtt");

const client = mqtt.connect("mqtt://broker.hivemq.com");

client.on("connect", () => {
  console.log("MQTT connected");
});

client.on("error", (err) => {
  console.error("MQTT error:", err);
});

module.exports = client;
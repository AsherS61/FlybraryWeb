const express = require("express");
const { getTemperature, postTemperature } = require("../controllers/esp.js");
const router = express.Router();

router.get('/latestTemperature', getTemperature)
router.post('/sendTemperature', postTemperature)

module.exports = router;
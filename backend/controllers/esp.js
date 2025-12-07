const Esp = require("../models/Esp.js");

//@desc     Get the latest temperature entry
//@route    GET /api/v1/esp/getTemperature
//@access   Public
exports.getTemperature = async (req, res, next) => {
    try {
        // Find latest entry sorted by recordedAt
        const latest = await Esp.findOne().sort({ recordedAt: -1 });

        if (!latest) {
            return res.status(404).json({
                success: false,
                error: "No temperature data found"
            });
        }

        return res.status(200).json({
            success: true,
            data: latest
        });

    } catch (err) {
        console.error("Error fetching latest ESP temperature:", err.message);

        return res.status(500).json({
            success: false,
            error: 'Internal Server Error while fetching temperature.'
        });
    }
};

//@desc     Update temperature entry
//@route    POST /api/v1/esp/postTemperature
//@access   Public
exports.postTemperature = async (req, res, next) => {
    try {
        const { temperature } = req;
        
        const newEntry = new Esp({ temperature });
        await newEntry.save();

        return res.status(200).json({
            success: true
        })


    } catch (err) {
        console.error("Error fetching borrowing instances:", err.message);
        
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error during borrowing instances retrieval.'
        });
    }
};
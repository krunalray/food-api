const { getSettings } = require('./app.service');
var phpunserialize = require("serialize-php").unserialize;
var now = new Date();

module.exports = {


    getSettings: async (req, res) => {
        const showQuery = req.query;
        try {
            getSettings(showQuery, (err, result) => {
                if (result != undefined && result.length) {
                    var settings = {};
                    function setSetting(setting) {
                        var data_key = setting.data_key;
                        var data_value = setting.data_value;
                        if (setting.serialized == 1) {
                            settings[data_key] = phpunserialize(data_value);
                        } else {
                            settings[data_key] = data_value;
                        }
                    }
                    result.forEach(setSetting);


                    return res.json({ success: 1, settings })
                } else {
                    return res.status(500).json({
                        success: 0,
                        message: "App Setting Not Getting"
                    });
                }

                // login imp

            })
        } catch (error) {
            console.log(" Error in show user " + error)
        }

    },


}

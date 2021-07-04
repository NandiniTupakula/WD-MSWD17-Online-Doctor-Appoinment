const cors = require('cors');// cross origin resource security
module.exports = function (app) {
    var my_list = ['http://localhost:1203'];
    const Options = (req, callback) => {
        let corsOptions;
        if (my_list.indexOf(req.header('Origin')) !== -1) {
            corsOptions = { origin: true }
        } else {
            corsOptions = { origin: false }
        }
        callback(null, corsOptions)
    }


    app.use(cors(Options));
    app.use('/booking/v2', require('../v2/RequiredApi/routes/routes'));//routes related to account controller
};

var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');
module.exports = {
    dev: {
        db: 'mongodb://127.0.0.1/IT-help-desk',
        rootPath: rootPath,
        port: process.env.PORT || 1203
    },
}

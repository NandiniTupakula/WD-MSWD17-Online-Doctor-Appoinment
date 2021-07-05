var mongooes = require('mongoose');

var db_url = "mongodb+srv://Deepaktiwari:Deepak@1@danial.8ljih.mongodb.net/SampleApplictaion?retryWrites=true&w=majority";
mongooes.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

// 0: disconnected// 1: connected// 2: connecting// 3: disconnecting
mongooes.connection.on('connected', function (response) {
         console.log("Mongoose is now Connected at: " + db_url);
});
mongooes.connection.on('disconnected', function (response) {
     console.log("Mongoose is now disconnected:");
});
mongooes.connection.on('Error', function (err) {
     console.log("Error while connecting: " + err);
});
function gracefulShutdown(msg, callback) {
     mongooes.connection.close(function () {
          console.log('Mongoose disconnected through ' + msg);
          callback();
     });
}

// BRING IN YOUR SCHEMAS & MODELS
require('../v2/model/mongoSchema');

const mongoose = require('mongoose');
const moment = require('moment');

/* Defining  Schema */
/* ------ Starts ------ */
var scheduleSchema = new mongoose.Schema({
    ord_id: String,
    vendor: String,
    PatientName :String,
    waitingTime:String,
    contact:Number,
    user: {
        type:Number
    },

    // status ==  0  means Booked status
    status: {
        type: Number,
        "default": 0
    },
    timeslot_from: String,
    timeslot_to: String,
    dateTimeslot_from: Date,
    dateTimeslot_to: Date,
    booked_date: Date,
    createdBy: {
        type: Number
    },
    createdOn: {
        type: Date,
        "default": Date.now
    },
    updatedBy: {
        type: String
    },
    updatedOn: {
        type: Date
    }
});

var listSchema =  new mongoose.Schema({
    PatientName :String,
    contact:Number,
    appintment_slot :String,
    waited :String,
    date:Date 
})
/*--------- Compiling schema as model --------*/

mongoose.model('schedule', scheduleSchema, 'schedule');
mongoose.model('appointment_list',listSchema,'appointment_list')

/*--------- Exporting models - ---------------*/
module.exports = {
    schedule: scheduleSchema,
    appointment_list:listSchema
}

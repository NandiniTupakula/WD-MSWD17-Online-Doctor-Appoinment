
var express = require('express');
var router = express.Router();
let requireController = require('../controller/requiredApiController');


router.use(function (req, res, next) {
     next();
});


router.route('/addSlot').post(requireController.addSlot);//used to created appointment
router.route('/getSlot').post(requireController.getSlot);//used to get available slots
router.route('/appointmentList').get(requireController.getAppointmentList);//used to fetch list of appointment
router.route('/scheduleList').post(requireController.getScheduleList);
module.exports = router;
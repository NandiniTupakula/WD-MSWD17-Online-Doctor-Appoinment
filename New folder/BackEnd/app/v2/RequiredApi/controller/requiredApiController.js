const model = require('../model/requiredApiModel');//model
const Joi = require('joi');

/**
 * Purpose  : Used to get availble slot based on slected date 
 * Required : Date
 * Response : provides list of available slots
 * Authore  : Deepak Tiwari
 */

module.exports.getSlot = function (req, res) {
     try {
          let data = req.body;
          if (typeof data != 'undefined') {
               model.get_all_slots(data.vendor , data.duration , data.selected_date ,'9:00'  ,'12:00').then(availableSlots=>{
                    if(availableSlots[0].length > 0 ){
                         model.get_all_slots(data.vendor  , data.duration  , data.selected_date ,'17:00'  ,'21:00').then(eveningAvailableSlots=>{
                              if(eveningAvailableSlots != null ){
                                   var finalArray = {
                                        'morningSlot':availableSlots[0],
                                        'eveningSlot':eveningAvailableSlots[0]
                                   };
                                   res.status(200).json({ "status": "Success", "message": "Available Slots." ,'data':finalArray });
                              } else {
                                   res.status(200).json({ "status": "Failed", "message": "All the slot are aready allocated." });
                              }
                         }).catch(err=>{
                              console.log(err);
                              res.status(200).json({ 'status': 'Failed', 'message': "Unable to process your request! Please try later." });
                         })
                    } else {
                         model.get_all_slots(data.vendor  , data.duration  , data.selected_date ,'17:00'  ,'21:00').then(eveningAvailableSlots=>{
                              if(eveningAvailableSlots[0].length > 0 ){
                                   var finalArray = {
                                        'morningSlot':[],
                                        'eveningSlot':eveningAvailableSlots[0]
                                   };
                                   res.status(200).json({ "status": "Success", "message": "Available Slots." ,'data':finalArray });
                              } else {
                                   res.status(200).json({ "status": "Failed", "message": "All the slot are aready allocated." });
                              }
                         }).catch(err=>{
                              console.log(err);
                              res.status(200).json({ 'status': 'Failed', 'message': "Unable to process your request! Please try later." });
                         })
                    }
               }).catch(err=>{
                    console.log(err);
                    res.status(200).json({ 'status': 'Failed', 'message': "Unable to process your request! Please try later." });
               })
          } else {
               res.status(200).json({ 'status': 'Failed', 'message': "Invalid request." });
          }
     } catch (err) {
          console.log(err);
          res.status(200).json({ "status": "Failed", "message": "Internal server error." });
     }
}


/**
 * Purpose  : Used to create new booking.
 * Required : orderId , user_id , vendor_id , status , slot , bookingDate
 * Response : Update the required details into table and create new booking
 * Authore  : Deepak Tiwari
 */
module.exports.addSlot=  function(req , res){
     try{
          let data  = req.body
          if (typeof data != 'undefined') {
               /* joi (client side validation) */
                    model.saveSlot( data.order_id , data.vendor_id , data.order_id,    data.selected_date,   data.slot_from, data.slot_to, data.status).then(slotted=>{
                         if( slotted != null ){
                              res.status(200).json({'status':'Success' ,'message':'Your appointment has successfully booked.!'})
                         } else {
                              res.status(200).json({ "status": "Failed", "message": "Unable to process your request try later !" });
                         }                  
                    }).catch(err => {
                         console.log(err);
                         res.status(200).json({'status':'Failed' ,'message':'Unable to process your request try later!'})
                    })  
          } else {
               res.status(200).json({ 'status': 'Failed', 'message': "Something went wrong please try later!" });
          }
     } catch(err){
          console.log(err);
          res.status(200).json({'status':'Failed' ,'message':'Internal Server Error'})

     }
}


/**
 * Purpose  : Used to get list of booked appointments.
 * Required : 
 * Response : Return list of appointments
 * Authore  : Deepak Tiwari
 */
module.exports.getAppointmentList=  function(req , res){
     try{
     /* joi (client side validation) */
          model.appointmentList().then(list=>{
               if(list.length > 0 ){
                    res.status(200).json({'status':'Success' ,'message':'Available appointment list.' , 'data':list})
               } else {
                    res.status(200).json({ "status": "Failed", "message": "Unable to process your request try later !" });
               }                  
          }).catch(err => {
               console.log(err);
               res.status(200).json({'status':'Failed' ,'message':'Unable to process your request try later!'})
          })  
     } catch(err){
          console.log(err);
          res.status(200).json({'status':'Failed' ,'message':'Internal Server Error'})

     }
}



/**
 * Purpose  : Used to get list of schedule.
 * Required : Date
 * Response : Return list of appointments
 * Authore  : Deepak Tiwari
 */
module.exports.getScheduleList=  function(req , res){
     try{
     /* joi (client side validation) */
          let data  = req.body
          if (typeof data != 'undefined') {
               /* joi (client side validation) */
               model.ScheduleList(data.date).then(list=>{
                    if(list.length > 0 ){
                         res.status(200).json({'status':'Success' ,'message':'Available appointment list.' , 'data':list})
                    } else {
                         res.status(200).json({ "status": "Success", "message": "No appointments found", 'data':list });
                    }                  
               }).catch(err => {
                    console.log(err);
                    res.status(200).json({'status':'Failed' ,'message':'Unable to process your request try later!'})
               })  
          } else {
               res.status(200).json({ 'status': 'Failed', 'message': "Something went wrong please try later!" });
          }  
     } catch(err){
          console.log(err);
          res.status(200).json({'status':'Failed' ,'message':'Internal Server Error'})

     }
}


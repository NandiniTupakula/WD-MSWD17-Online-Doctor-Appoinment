const moment = require('moment');//moment is used for date formatting
var mongoose = require('mongoose');
const { reject } = require('core-js/fn/promise');
const { resolve } = require('path');
const schedule = mongoose.model('schedule');
const list =  mongoose.model('appointment_list');
var random_name = require('node-random-name');


/**
 * purpose : Used to get working hours.
 * request : current_day and working_days
 * return : return working hour based on current day ,
 * author : Deepak Tiwari
 */
function get_weeks_avialability(current_day, working_days ) {
     try {
          var working_hrs;
          var week_count = current_day.day();
          working_hrs = working_days.filter((days) => days.day === week_count);
          return working_hrs;
     } catch(err) {
          console.log(err);
     }
     
}

//used to get all booked slots based on vendor details
async function get_booked_slot (vendor_id){
  return new Promise((resolve , reject )=>{
     try {
          schedule.find({vendor : vendor_id}).then(booked_slots=>{
               if(booked_slots.length > 0){
                    resolve(booked_slots);
               } else {
                    resolve([]);
               }

          }).catch(err=>{
               console.log(err);
               reject(err);
          })
  
       } catch(err){
          console.log(err);
          reject(err);
       }
  })
     
} 
 
//used to get unique element from an array
Array.prototype.unique = function () {
     return this.filter(function (value, index, self) {
          return self.lastIndexOf(value) === index;
     });
}

//used to get list of available based on doctor availble hours.
 module.exports.get_all_slots = async (vendor, duration,date, startTimeString , endTimeString) => {
  return new Promise(async (resolve , reject)=>{
     try {  
          var available_slots = [];
          var client_date = new moment(new Date(date));
          var current_date = client_date;
          var day_count = 0; 
          // Based on vendor(Doctor) detail fetching already booked slot
          let booked_slots =  await get_booked_slot(vendor);
               if (day_count > 0)
                    current_date = current_date.add(1, 'days'); //add days  
                    start_timeStr = startTimeString ; //'18:00',
                    start_time = new moment(start_timeStr, 'HH:mm');
                    end_timeStr =endTimeString;
                    end_time = new moment(end_timeStr, 'HH:mm');
                    current_date.set({
                         hour: start_time.get('hour'),
                         minute: start_time.get('minute'),
                         second: start_time.get('second')
                    });
                    var end_slot_date = new moment(new Date(current_date)).set({
                         hour: end_time.get('hour'),
                         minute: end_time.get('minute'),
                         second: end_time.get('second')
                    });
                    var start_slot = current_date;
                    var end_slot = end_slot_date.subtract(duration, 'minutes');
                    var current_slot = start_slot;
                    //Looking for already booked slot 
                    if (booked_slots != null)
                         var already_booked_slots_day = booked_slots.filter(p => moment(p.booked_date).format('MM-DD-YYYY') === current_date.format('MM-DD-YYYY'));
                         slots = [];
                         var count = 0;
                         while (start_slot <= end_slot) {
                              slot_valid = true;
                              if (count > 0) {
                                   start_slot = current_date.add(duration, 'minutes');
                              }
                              if (start_slot <= end_slot) {
                                   if (already_booked_slots_day && already_booked_slots_day.length > 0) {
                                   //check if the slot is available
                                   already_booked_slots_day.forEach(element => {
                                        if (slot_valid) {
                                             b_fro_time = new moment(element.dateTimeslot_from).format();
                                             b_to_time = new moment(element.dateTimeslot_to).format();
                                             //Removing already booked slot
                                             if (start_slot.format() >= b_fro_time && start_slot.format() < b_to_time) {
                                                 slot_valid = false;
                                             }
                                        }

                                   });


                                   }
                              } else {
                                   slot_valid = false;
                              }
                              if (slot_valid) {
                                   slots.push(new moment(current_slot).format());
                              }

                              count += 1;
                    }
                    available_slots.push( slots);
               
               day_count += 1;
          resolve(available_slots);
      } catch (err) {
         console.log(err);
         reject(err);
      }
  })
     
 }


//used for appointment booking
 module.exports.saveSlot =  function(orderId , vendorId , userId , bookedDate , slotFrom,slotTo, status){
      return new Promise((resolve , reject)=>{
           try {
               let booked_date =  moment(bookedDate).format("YYYY-MM-DD");
               console.log()
               let from =  booked_date +" "+slotFrom;
               let to =  booked_date +" "+slotTo;
               schedule.create(
                    {
                         'order_id':orderId ,
                         'vendor':vendorId,
                         'user':userId,
                         'booked_date': booked_date,
                         'timeslot_from': slotFrom,
                         'timeslot_to': slotTo,
                         'dateTimeslot_from':new moment(from).format(),
                         'dateTimeslot_to': new moment(to).format(),
                         'status':status,
                         'createdBy':userId,
                         'PatientName' :random_name(),
                         'waitingTime':"Not Arrived",
                         'contact':Math.floor(Math.random() * 1000000000)
                    }, function(err, created) {
                    if (err) {
                        reject(err);
                    } else if (created) {
                        resolve(created);
                    } else {
                        reject(created);
                    }
                });
           } catch(err){
                console.log(err);
           }
      })
 }


 //used to get list of appointment
 module.exports.appointmentList =  function(){
     return new Promise((resolve , reject)=>{
          try {
              list.find(
                   {}, function(err, result) {
                   if (err) {
                       reject(err);
                   } else if (result) {
                       resolve(result);
                   } else {
                       reject(result);
                   }
               });
          } catch(err){
               console.log(err);
               reject(err);
          }
     })
}
 

 //used to get list of appointment
 module.exports.ScheduleList =  function(date){
     return new Promise((resolve , reject)=>{
          try {
               let selectedDate =  new moment(date).format('YYYY-MM-DD');
              schedule.find(
                   {booked_date:selectedDate}, function(err, result) {
                   if (err) {
                       reject(err);
                   } else if (result) {
                       resolve(result);
                   } else {
                       reject(result);
                   }
               });
          } catch(err){
               console.log(err);
               reject(err);
          }
     })
}
 

import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { NotificationService } from 'src/app/services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { Moment } from 'moment';
import * as moment from "moment";
import { Location } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.css']
})
export class ManageBookingComponent implements OnInit {
  
  selectedDate: Moment;  
  AvailableSlot :[];
  isValid = 1;
  AddButtonToggle =  0;
  isValidEvening = 1;
  AddButtonToggleEvening =  0;
  selectedFromButton;
  selectedToButton;
  startAt=moment().format();

  vm:any={
    from:"",
    to:""
  }
  constructor( private location: Location ,private notification: NotificationService, private spinner: NgxSpinnerService , private httpCall : HttpClient) { }

    ngOnInit() {
      this.AvailableSlot=[];
      this.getSlot(moment().format());
     
    }

    //Used to retrive selected Date
    onSelect(event){
      this.selectedDate= event;
      this.getSlot(moment(this.selectedDate).format());
    }
  
   //Used to get List available slots based on selected date.
    getSlot(dateTime) {
        let data={
          "vendor":2332,
          "working_hrs":"9:00 -12:00 AM",
          "duration":30,
          "selected_date":dateTime
        }
        this.spinner.show();
        this.httpCall.post(`${environment.consumerDomain}/getSlot`,data).subscribe(res => {
          if (res['status'] =='Success' ) {
            this.spinner.hide();
            // this.notification.showNotification('success', res['message']);
            this.AvailableSlot=  res['data'];
          }else if(res['status'] ==  'Failed' ){
            this.spinner.hide();
            this.AvailableSlot=[];
            this.notification.showNotification('success', res['message']);
          } else {
            this.spinner.hide();
            this.AvailableSlot=[];
            this.notification.showNotification('success', res['message']);
          }
        }, err => {
          this.AvailableSlot=[];
          this.spinner.hide();
          Swal.fire(
            'ERROR:',
            'Something went wrong! Please try after sometime.',
            'error'
          )
        })
    }

    //used to book an appointment
    booking(){  
      if(this.vm.from ===  this.selectedFromButton && this.vm.to === this.selectedToButton)
      {
        let data={
          "vendor_id":2332,
          "order_id":Math.floor(Math.random()*100000+1),
          "user_id":Math.floor(Math.random()*100000+1),
          "status":"0",
          "selected_date":moment(this.selectedDate).format(),
          "slot_from":this.vm.from,
          "slot_to" :this.vm.to
        }
        this.spinner.show();
        this.isValid =1;
        this.AddButtonToggle =0;
        this.httpCall.post(`${environment.consumerDomain}/addSlot`,data).subscribe(res => {
          if (res['status'] =='Success' ) {
            this.spinner.hide();
            this.notification.showNotification('success', res['message']);
            location.reload();
          }else if(res['status'] ==  'Failed' ){
            this.spinner.hide();
            this.notification.showNotification('success', res['message']);
          } else {
            this.spinner.hide();
            this.notification.showNotification('success', res['message']);
          }
        }, err => {
          this.spinner.hide();
          Swal.fire(
            'ERROR:',
            'Something went wrong! Please try after sometime.',
            'error'
          )
        })
      } else {
        var message ="Please select valid slot."
        this.notification.showNotification('warning', message);
      }
     
    }

    selectedSlot(value ,flag) {
      console.log(value)
      let momentDate =  moment(value).format();
        var newDate =    moment(momentDate).add(30,'m').format();
        console.log(newDate)
        if(flag == 0){
          this.isValid =0;
          this.AddButtonToggle =1;
          this.selectedFromButton =  moment(momentDate).format('HH:mm') 
          this.selectedToButton =  moment(newDate).format('HH:mm');
        } else if(flag == 2){
          this.isValidEvening =1;
          this.AddButtonToggleEvening =0;
          this.isValid =1;
          this.AddButtonToggle =0;
          this.selectedFromButton =  moment(momentDate).format('HH:mm') 
          this.selectedToButton =  moment(newDate).format('HH:mm');
        } else {
          this.isValid =1;
          this.AddButtonToggle =0;
          this.selectedFromButton =  moment(momentDate).format('HH:mm') 
          this.selectedToButton =  moment(newDate).format('HH:mm');
        }
      console.log("---116-----",  this.selectedFromButton)
      console.log("---117-----",  this.selectedToButton)
    }

    bookingEvening(){  
      if(this.vm.from ===  this.selectedFromButton && this.vm.to === this.selectedToButton)
      {
        let data={
          "vendor_id":2332,
          "order_id":Math.floor(Math.random()*100000+1),
          "user_id":Math.floor(Math.random()*100000+1),
          "status":"0",
          "selected_date":moment(this.selectedDate).format(),
          "slot_from":this.vm.from,
          "slot_to" :this.vm.to
        }
        this.spinner.show();
        this.isValidEvening =1;
        this.AddButtonToggleEvening =0;
        this.httpCall.post(`${environment.consumerDomain}/addSlot`,data).subscribe(res => {
          if (res['status'] =='Success' ) {
            this.spinner.hide();
            this.notification.showNotification('success', res['message']);
            location.reload();
          }else if(res['status'] ==  'Failed' ){
            this.spinner.hide();
            this.notification.showNotification('success', res['message']);
          } else {
            this.spinner.hide();
            this.notification.showNotification('success', res['message']);
          }
        }, err => {
          this.spinner.hide();
          Swal.fire(
            'ERROR:',
            'Something went wrong! Please try after sometime.',
            'error'
          )
        })
      } else {
        var message ="Please select valid slot."
        this.notification.showNotification('warning', message);
      }
     
    }

    selectedSlotEvening(value ,flag) {
      console.log(value)
      let momentDate =  moment(value).format();
        var newDate =    moment(momentDate).add(30,'m').format();
        console.log(newDate)
        if(flag == 0){
          this.isValidEvening =0;
          this.AddButtonToggleEvening =1;
          this.selectedFromButton =  moment(momentDate).format('HH:mm') 
          this.selectedToButton =  moment(newDate).format('HH:mm');
        } else {
          this.isValidEvening =1;
          this.AddButtonToggleEvening =0;
          this.selectedFromButton =  moment(momentDate).format('HH:mm') 
          this.selectedToButton =  moment(newDate).format('HH:mm');
        }
    }

}



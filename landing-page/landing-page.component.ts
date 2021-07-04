import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { NotificationService } from 'src/app/services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Location } from '@angular/common';
import * as moment from "moment";
import { Moment } from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor( private location: Location, private notification: NotificationService, private spinner: NgxSpinnerService, private http: HttpClient ,private router :Router) { }

  @ViewChild(MatPaginator) notificationPaginator: MatPaginator;
  @ViewChild(MatSort) notificationSort: MatSort;

  Columns = ['Sno','Patient', 'Contact', 'Appointment', 'Waiting', 'Action'];
  index=0;
  selectedDate: Moment;  
  dm:any= {
    date:''
  }
  count;
  firstName = "Deepak"
  scheduleList : MatTableDataSource<DataType>;
  appointmentList: MatTableDataSource<DataType>;

  ngOnInit() {
    this.dm.date =  moment().format();
    this.selectedDate =  this.dm.date;
    this.getAppointment();
    this.getSchedule(this.dm.date);
  }

  
  //Used to retrive selected Date
  onChange(event){
    this.selectedDate = event;
    console.log("Hello Dude" , this.dm.date)
    this.getSchedule(moment(this.dm.date).format());
  }
  //Used to get List of booked appointments.
  getAppointment() {
    this.spinner.show();
    this.http.get(`${environment.consumerDomain}/appointmentList`).subscribe(res => {
      if (res['status'] =='Success' ) {
        this.spinner.hide();
        // this.notification.showNotification('success', res['message']);
        this.appointmentList = new MatTableDataSource(res['data']);
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
  }

  //Used to get List of booked appointments.
  getSchedule(date) {
    let data = {
      date :date
    }
    this.spinner.show();
    this.http.post(`${environment.consumerDomain}/scheduleList`,data).subscribe(res => {
      console.log(res);
      if (res['status'] =='Success' ) {
        this.spinner.hide();
        this.notification.showNotification('success', res['message']);
        this.scheduleList = new MatTableDataSource(res['data']);
        this.count  =  res['data'].length;
      }else if(res['status'] ==  'Failed' ){
        this.spinner.hide();
        this.notification.showNotification('warning', res['message']);
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
  }

  applyFilter(filterValue: string) {
    this.appointmentList.filter = filterValue.trim().toLowerCase();
  }

  navigateBack() {
    this.location.back();
  }

  

 
}


export interface DataType {
  Id:Number,
  Patient: string,
  Contact: Number,
  Appointment: string,
  Waiting: string,
  Active: string,
}
import { Injectable } from "@angular/core";
import Swal from 'sweetalert2';

@Injectable()
export class NotificationService {
  // showNotification(messageType, message) {
  //   const toast = (Swal as any).mixin({
  //     toast: true,
  //     position: 'top',
  //     showConfirmButton: false,
  //     timer: 3000
  //   });

  //   toast({
  //     type: messageType,
  //     title: message
  //   });
  // }
  showNotification(messageType, message) {
    Swal.fire({
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      type: messageType,
      title: message
    });
  }
}
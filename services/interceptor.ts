import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse, HttpEventType } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Router } from '@angular/router';

@Injectable()
export class MyInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  fourDigitedErrors = [400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410];
  fiveDigitedErrors = [500, 501, 502, 503, 504, 505, 511];
  
  uploadedPercentage = 0;

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
        
    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            
          }
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            if(this.fourDigitedErrors.indexOf(error.status) != -1) {
                this.router.navigate(['/notFound']);
            } else if(this.fiveDigitedErrors.indexOf(error.status) != -1) {
                this.router.navigate(['/serverError']);
            } else {
                
            }
          }
        }
      )
    );
  }
}
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environments/environments';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(environment.prod) {
      const apiReq = request.clone({ url: `${environment.apiUrl}${request.url}` });
    return next.handle(apiReq);
    } else {
      const apiReq = request.clone({ url: `/api/${request.url}` });
    return next.handle(apiReq);
    }

  }
}

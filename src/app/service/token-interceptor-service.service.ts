import { Injectable, Injector} from '@angular/core';
import { UsersService } from './users.service';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorServiceService implements HttpInterceptor {

  constructor(private inj: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userService: UsersService = this.inj.get(UsersService);
    request = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${userService.getToken()}`,
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'expire': '0'

      }
    });
    return next.handle(request);
  }
}

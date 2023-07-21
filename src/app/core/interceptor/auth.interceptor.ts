import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize, tap } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  _loaderService = inject(LoaderService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let me = this;
    console.log('[INTERCEPTOR-OLD]', request);
    me._loaderService.show();
    request = request.clone({
      headers: request.headers.set('token', localStorage.getItem('token') || 'not-found-token')
    })
    console.log('[INTERCEPTOR-NEW]', request);
    return next.handle(request).pipe(
      finalize(() => me._loaderService.hide())
    );
  }
}

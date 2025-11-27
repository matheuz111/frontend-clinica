import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../../services/autenticacion.service';
import { environment } from '../../environments/environments';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AutenticacionService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    
    // Excluir endpoints de autenticación para no enviar el token al hacer login/registro
    const isAuthUrl = request.url.includes('/auth/');

    if (token && isApiUrl && !isAuthUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}
import { LogoffComponent } from '../../components/shared/logoff/logoff.component';
import { environment } from '../../../environments/environment.prod';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Injectable, Injector } from '@angular/core';
import { tap } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
} from '@angular/common/http';
import { Observable, Subscription, throwError, timer } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { AppConfigService } from 'src/app/providers/app-config.service';
import { KeycloakService } from 'keycloak-angular';

@Injectable({ providedIn: 'root' })
export class TokenInterceptor implements HttpInterceptor {
  tokenLogado: any;
  url: string;

  constructor(
    private configService: AppConfigService,
    private http: HttpClient,
    private router: Router,
    private readonly keycloak: KeycloakService,
    private authService: AuthService
  ) {
    this.url = configService.config.baseUrl;
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
    
  ): Observable<HttpEvent<any>> {
      const token = this.authService.token;
      if(token && !this.keycloak.isTokenExpired()) {
        const requestUrl: Array<any> = request.url.split('/');
        if (!request.url.includes('login')) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
        return next.handle(request);
      }else {
          this.keycloak.logout()
          return throwError(() => new Error('Usuário não autenticado.'));
      }
  }
}

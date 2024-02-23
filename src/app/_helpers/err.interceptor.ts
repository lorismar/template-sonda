import { TokenInterceptor } from 'src/app/services/interceptors/token.interceptor';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { KeycloakService } from 'keycloak-angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private toastr: ToastrService,
    private readonly keycloak: KeycloakService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        const url = err.url.split('/');
        const error = err.error.message || err.error || err.statusText;

        if (err.status === 401) {
          if (
            (url[2] === 'www.dev.tjro.jus.br' ||
              url[2] === 'www.hmg.tjro.jus.br' ||
              url[2] === 'www.seo.tjro.jus.br')
          ) {
              this.toastr.error('Sessão expirada!');
              this.keycloak.logout();
            }
        }
        if (err.status === 403) {
          this.toastr.error('Erro no servidor da aplicação!');
          this.toastr.error(error);
        }

        return throwError(() => error);
      })
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuarioModel } from 'src/app/model/usuario-model';
import { environment } from '../../../environments/environment';
import { AppConfigService } from 'src/app/providers/app-config.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { LogoffComponent } from 'src/app/components/shared/logoff/logoff.component';
import { KeycloakService } from 'keycloak-angular';


const KEY = 'userLogado';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string;
  public roles: any[] = [];
  public token: string = '';
  constructor(
    private http: HttpClient,
    private router: Router,
    public jwtHelper: JwtHelperService,
    private modalService: NgbModal,
    configService: AppConfigService,
    private readonly keycloak: KeycloakService
  ) {
    this.url = configService.config.baseUrl;
  }

  public loginSSO(usuario: UsuarioModel): Observable<any> {
    return this.http
      .post<UsuarioModel>(`${this.url}/auth/login`, usuario)
      .pipe(
        tap((resposta: any) => {
          if (resposta) {
            localStorage.setItem(
              'userLogado',
              window.btoa(JSON.stringify(resposta))
            );
            setTimeout(() => {
              this.openModalExpired();
            }, resposta.token.expiresIn * 1000)
          }
        })
      );
  }

  deslogar() {
    localStorage.clear();
    sessionStorage.clear();
    this.keycloak.logout();
  }

  
  public openModalExpired() {
    const options: NgbModalOptions = {
      backdrop: 'static', 
      keyboard: false, 
      size: 'lg',
      centered: true,
      scrollable: true,
    };
    const modalRef = this.modalService.open(LogoffComponent, options);
    modalRef.componentInstance.title = 'Sessão expirada';
    modalRef.componentInstance.message =
      'Sua sessão expirou. Por favor, faça login novamente.';
    modalRef.result.then(() => {
      this.deslogar();
    });
  }
}

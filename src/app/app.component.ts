import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { AuthService } from './services/auth/auth.service';
import { UsuarioService } from './services/usuario/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'sgc-frontend';
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  private timeoutId: any;


  constructor(private readonly keycloak: KeycloakService,
              private authService: AuthService,
              private usuarioService: UsuarioService) {

  }

  async ngOnInit() {
    const isLoggedIn = await this.keycloak.isLoggedIn();
    if(isLoggedIn) {
      this.authService.token = await this.keycloak.getToken();
      this.usuarioService.registrarUsuario().subscribe();  
    }else {
      this.keycloak.logout();
    }
  }

  toggleMenu(): void {
    const body = document.querySelector("body");
    if (body) {
      body.classList.toggle("collapsedMenu");
    }
  }
  
  
}



import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { KeycloakService } from 'keycloak-angular';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private toastr: ToastrService,
        private readonly keycloak: KeycloakService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const roles = this.keycloak.getUserRoles();
        if (roles) {
            if (!roles.some((role: string) => route.data['roles'].includes(role))) {
                this.toastr.error('Voce não possui permissão para essa ação');
                this.router.navigate(['/home']);
                return false;
            }
            return true;
        }
        this.keycloak.logout();
        return false;
    }
}
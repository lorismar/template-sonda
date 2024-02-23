import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private toastr: ToastrService, private readonly keycloak: KeycloakService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const expectRoles: string[] = route.data['expectRoles'];
    try {
      const roles = this.keycloak.getUserRoles();
      if (!expectRoles.some((role: string) => roles.includes(role))) {
        this.toastr.error('Você não tem permissão para acessar essa rota.');
        this.router.navigate(['/home']);
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }
}

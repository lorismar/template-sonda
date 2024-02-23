import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Directive({
  selector: '[appHasPermission]'
})
export class HasPermissionDirective implements OnInit {
  @Input() appHasPermission: string[]

  constructor(private el: ElementRef, private readonly keycloak: KeycloakService) { }

  ngOnInit(): void {
    const roles = this.keycloak.getUserRoles();
    if(!roles.some((role: string) => this.appHasPermission.includes(role))){
      this.el.nativeElement.remove()
    }
  }
}

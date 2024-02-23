import { KeycloakService } from "keycloak-angular";
import { ObservableInput, catchError, filter, flatMap, map, of } from "rxjs";
import { KeycloakConfigService } from "./keycloak-config.service";


export function initializer(
    keycloak: KeycloakService,
    keycloakConfigService: KeycloakConfigService
  ) {
    return (): Promise<boolean> =>
      keycloakConfigService.getConfig().pipe(
        map((config) => {
          return keycloak.init({
            config: {
              url: config.keycloakUrl,
              realm: config.keycloakRealm,
              clientId: config.keycloakClientId,
            },
            initOptions: {
              onLoad: 'login-required',
              checkLoginIframe: false,
              flow: 'standard',
            },
          })
        }),
        catchError((error) => {
          console.error('Error initializing Keycloak:', error);
          return of(false) as ObservableInput<any>;
        })
      ).toPromise();
  }
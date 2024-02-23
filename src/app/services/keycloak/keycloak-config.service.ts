import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { KeycloakConfig } from "keycloak-js";
import { Observable, catchError, filter, from, map, of } from "rxjs";

@Injectable({providedIn: 'root'})
export class KeycloakConfigService {
    private config: KeycloakConfig | undefined;

    constructor(private http: HttpClient) {
    }

    getConfig(): Observable<any> {
      if (this.config) {
        return of(this.config);
      } else {
        const configObservable: Observable<any> = from(
          fetch('./assets/config/config.json').then((response) => {
            if (!response.ok) {
              console.log('Network response was not ok');
            }
            return response.json();
          })
        );
        configObservable.subscribe((config: any) => (this.config = config));
        return configObservable;
      }
    }
}
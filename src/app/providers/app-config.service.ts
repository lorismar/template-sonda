import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
 config: any;
  constructor(private http: HttpClient) { }
  public loadConfig() {
    return fetch('./assets/config/config.json')
      .then(response => response.json())
      .then(config => this.config = config)
      .catch(err => console.error(err));
  }
}
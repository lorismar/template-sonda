import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { GarantiasModel } from 'src/app/model/garantias-model';
import { AppConfigService } from 'src/app/providers/app-config.service';

@Injectable({
  providedIn: 'root',
})
export class GarantiasService {
  url: string;
  constructor(private http: HttpClient, configService: AppConfigService) {
    this.url = configService.config.baseUrl;
  }

  salvarGarantias(data: any): Observable<any> {
    return this.http.post(`${this.url}/garantia`, data);
  }

  getByIdGarantia(idContrato: any) {
    return this.http.get(`${this.url}/garantia/${idContrato}`);
  }

  editarGarantias(idGarantia: any, garantiasModel: GarantiasModel): Observable<any> {
    return this.http.put(`${this.url}/garantia/${idGarantia}`, garantiasModel);
  }
}

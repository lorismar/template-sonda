import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment.dev';
import { DadosBasicosModel } from 'src/app/model/dadosBasicos-model';
import { AppConfigService } from 'src/app/providers/app-config.service';

@Injectable({
  providedIn: 'root',
})
export class DadosBasicosService {
  url: string;
  constructor(private http: HttpClient, configService: AppConfigService) {
    this.url = configService.config.baseUrl;
  }

  salvarDadosBasicos(dadosBasicosModel: DadosBasicosModel): Observable<any> {
    return this.http.post(`${this.url}/contrato`, dadosBasicosModel);
  }

  removerProcesso(idProcesso: any){
    return this.http.delete(`${this.url}/contrato/processo/${idProcesso}`);
  }

  editarDadosBasicos(idContrato: any, dadosBasicosModel: DadosBasicosModel): Observable<any> {
    return this.http.put(`${this.url}/contrato/${idContrato}`, dadosBasicosModel);
  }

  getByIdContrato(idContrato: any) {
    return this.http.get(`${this.url}/contrato/${idContrato}`);
  }

  getInfoContrato(idContrato: any) {
    return this.http.get(`${this.url}/termo-aditivo/contrato/info/${idContrato}`);
  }
}

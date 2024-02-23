import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatasPrazosModel } from '../../model/datas-prazos-model';
import { AppConfigService } from 'src/app/providers/app-config.service';

@Injectable({
  providedIn: 'root',
})
export class TDatasPrazosService {
  url: string;
  constructor(private httpClient: HttpClient, configService: AppConfigService) {
    this.url = configService.config.baseUrl;
  }

  salvarDataPrazos(dataPrazos: DatasPrazosModel): Observable<any> {
    return this.httpClient.post(`${this.url}/data-prazo`, dataPrazos);
  }

  editarDataPrazos(dataPrazos: DatasPrazosModel, id: any): Observable<any> {
    return this.httpClient.put(`${this.url}/data-prazo/` + id, dataPrazos);
  }

  getDataPrazos(idAjusteContrato: any): Observable<any> {
    return this.httpClient.get(`${this.url}/data-prazo/ajuste/${idAjusteContrato}`)
  }
}

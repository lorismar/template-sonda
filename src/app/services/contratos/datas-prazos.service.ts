import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.dev';
import { DatasPrazosModel } from '../../model/datas-prazos-model';
import { AppConfigService } from 'src/app/providers/app-config.service';

@Injectable({
  providedIn: 'root',
})
export class DatasPrazosService {
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

  getDataPrazos(idContrato: any): Observable<any> {
    return this.httpClient.get(`${this.url}/data-prazo/${idContrato}`)
  }

  getLastTa(idContrato: any): Observable<any> {
    return this.httpClient.get(`${this.url}/ajuste/termo-aditivo/contrato/ultimo/${idContrato}`);
  }
}

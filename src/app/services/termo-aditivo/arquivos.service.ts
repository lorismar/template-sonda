import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment.dev';
import { DadosBasicosModel } from 'src/app/model/dadosBasicos-model';
import { AppConfigService } from 'src/app/providers/app-config.service';

@Injectable({
  providedIn: 'root',
})
export class TArquivosService {
  url: string;
  constructor(private http: HttpClient, configService: AppConfigService) {
    this.url = configService.config.baseUrl;
  }

  postArquivos(arquivos: any): Observable<any> {
    return this.http.post(`${this.url}/arquivo/termo-aditivo`, arquivos);
  }

  getAllArquivosContrato(idAjusteContrato: any) {
    return this.http.get(`${this.url}/arquivo/termo-aditivo/${idAjusteContrato}`);
  }

  getDownloadArquivo(idArquivo: any) {
    return this.http.get(`${this.url}/arquivo/download/${idArquivo}`, { responseType: 'blob'});
  }
  deleteArquivo(idArquivo: any) {
    return this.http.delete(`${this.url}/arquivo/${idArquivo}`);
  }
}

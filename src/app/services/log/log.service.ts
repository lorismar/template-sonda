import { environment } from 'src/environments/environment.dev';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuadroDemonstrativoModel } from 'src/app/model/quadroDemonstrativo-model';
import { AppConfigService } from 'src/app/providers/app-config.service';
interface LogSearchParams {
  page: number;
  size: number;
  direction: string;
  usuario?: string;
  aba?: string;
  tipoDocumento?: string;
  numero?: string | number;
  data?: any;
}
@Injectable({
  providedIn: 'root'
})
export class LogService {
  url: string;
  constructor(private http: HttpClient, configService: AppConfigService) { 
    this.url = configService.config.baseUrl;
  }
  getAll(
    pageNumber: number,
    size: number,
  ): Observable<any> {

    return this.http.get(
      `${this.url}/historico/lista?size=${size}&page=${pageNumber}`);
  }

  pesquisarLog(params: LogSearchParams): Observable<any> {
    let url = `${this.url}/historico/lista?size=${params.size}&page=${params.page},${params.direction}`;
  
    if (params.usuario) {
      url += `&usuario=${params.usuario}`;
    }
    if (params.aba) {
      url += `&funcionalidade=${params.aba}`;
    }
    if (params.numero) {
      url += `&numero=${params.numero}`;
    }
    if (params.data) {
      url += `&dataEdicao=${params.data}`;
    }
    if (params.tipoDocumento) {
      url += `&tipoDocumento=${params.tipoDocumento}`;
    }
    return this.http.get(url);
  }
  
}

import { environment } from 'src/environments/environment.dev';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuadroDemonstrativoModel } from 'src/app/model/quadroDemonstrativo-model';
import { AppConfigService } from 'src/app/providers/app-config.service';
interface ContratoSearchParams {
    page: number;
    size: number;
    sort: string;
    direction: string;
    nomeFornecedor?: string;
    tipoContrato?: string;
    objeto?: string;
    numeroContrato?: number | string;
    numeroProcesso?: number | string;
    gestor?: string;
    unidade?: string;
    status?: string;
  }
@Injectable({
  providedIn: 'root'
})
export class ListaTAService {
  url: string;
  constructor(private http: HttpClient, configService: AppConfigService) { 
    this.url = configService.config.baseUrl;
  }
  getAll(
    pageNumber: number,
    size: number,
    sort: string,
    direction: string
  ): Observable<any> {

    return this.http.get(
      `${this.url}/ajuste/lista?size=${size}&page=${pageNumber}&sort=${sort},${direction}`);
  }
  
  pesquisarTA(params: ContratoSearchParams): Observable<any> {
    let url = `${this.url}/ajuste/lista?size=${params.size}&page=${params.page}&sort=${params.sort},${params.direction}`;
  
    if (params.nomeFornecedor) {
      url += `&nomeFornecedor=${params.nomeFornecedor}`;
    }
    if (params.tipoContrato) {
      url += `&tipoContrato=${params.tipoContrato}`;
    }
    if (params.objeto) {
      url += `&objeto=${params.objeto}`;
    }
    if (params.numeroContrato) {
      url += `&numeroContrato=${params.numeroContrato}`;
    }
    if (params.numeroProcesso) {
      url += `&numeroProcesso=${params.numeroProcesso}`;
    }
    if (params.gestor) {
      url += `&gestor=${params.gestor}`;
    }
    if (params.unidade) {
      url += `&unidade=${params.unidade}`;
    }
    if (params.status) {
      url += `&status=${params.status}`;
    }
  
    return this.http.get(url);
  }

  delete(idAjusteContrato: any): Observable<any> {
    return this.http.delete(`${this.url}/ajuste/${idAjusteContrato}`)
  }
}

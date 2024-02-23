import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuadroDemonstrativoModel } from 'src/app/model/quadroDemonstrativo-model';
import { AppConfigService } from 'src/app/providers/app-config.service';
interface contratoSearchParams {
  page: number;
  size: number;
  sort: string;
  direction: string;
  numeroContrato?: string;
  nomeFornecedor?: string;
  numeroProcesso?: string;
  objeto?: string;
  tipoContrato?: string;
}
@Injectable({
  providedIn: 'root'
})
export class MeusContratosService {
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

  pesquisarContratos(params: contratoSearchParams): Observable<any> {
    let url = `${this.url}/contrato/lista/gestor?size=${params.size}&page=${params.page}&sort=${params.sort},${params.direction}`;
  
    if (params.numeroProcesso) {
      url += `&numeroProcesso=${params.numeroProcesso}`;
    }
    if (params.numeroContrato) {
      url += `&numeroContrato=${params.numeroContrato}`;
    }
    if (params.nomeFornecedor) {
      url += `&nomeFornecedor=${params.nomeFornecedor}`;
    }
    if (params.objeto) {
      url += `&objeto=${params.objeto}`;
    }
    if (params.tipoContrato) {
      url += `&tipoContrato=${params.tipoContrato}`;
    }
    return this.http.get(url);
  }
  
}

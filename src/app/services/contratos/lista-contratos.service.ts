import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PesquisaContrato } from '../../model/lista-contratos.model';
import { environment } from '../../../environments/environment';
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
  ta?: string;
  ap?: string;
}
@Injectable({
  providedIn: 'root'
})
export class ContratosService {
  url: string;
  private token: string = '';

  constructor(private http: HttpClient, configService: AppConfigService) { 
    this.url = configService.config.baseUrl;
  }
  getContratos(
    pageNumber: number,
    size: number,
    sort: string,
    direction: string
  ): Observable<any> {

    return this.http.get(
      `${this.url}/contrato/lista?size=${size}&page=${pageNumber}&sort=${sort},${direction}`);
  }

  getTAByContrato(idContrato: string): Observable<any> {
    return this.http.get(
      `${this.url}/termo-aditivo/contrato/${idContrato}`);
  }

  
  pesquisarContratos(params: ContratoSearchParams): Observable<any> {
    let url = `${this.url}/contrato/lista?size=${params.size}&page=${params.page}&sort=${params.sort},${params.direction}`;
  
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
    if (params.ta) {
      url += `&ta=${params.ta}`;
    }
    if (params.ap) {
      url += `&ap=${params.ap}`;
    }
  
    return this.http.get(url);
  }
  

}
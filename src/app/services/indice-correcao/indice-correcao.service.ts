import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment.dev';
import { DadosBasicosModel } from 'src/app/model/dadosBasicos-model';
import { AppConfigService } from 'src/app/providers/app-config.service';
interface IndiceSearchParams {
    page: number;
    size: number;
    sort: string;
    direction: string;
    nome?: string;
    codigo?: string;
    status?: string;
  }
@Injectable({
  providedIn: 'root',
})
export class IndiceCorrecaoService {
  url: string;
  constructor(private http: HttpClient, configService: AppConfigService) {
    this.url = configService.config.baseUrl;
  }

  salvar(data: any) {
    return this.http.post(`${this.url}/indice-correcao`, data);
  }

  editar(id: string, data: any) {
    return this.http.put(`${this.url}/indice-correcao/${id}`, data);
  }

  getIndice(id: string | number) {
    return this.http.get(`${this.url}/indice-correcao/${id}`);
  }

  pesquisarIndices(params: IndiceSearchParams): Observable<any> {
    let url = `${this.url}/indice-correcao/lista?size=${params.size}&sort=${params.sort},${params.direction}&page=${params.page}`;
  
    if (params.nome) {
      url += `&nome=${params.nome}`;
    }
    if (params.codigo) {
      url += `&codigo=${params.codigo}`;
    }
    if (params.status) {
      url += `&status=${params.status}`;
    }
  
    return this.http.get(url);
  }
}

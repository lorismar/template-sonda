import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmpenhoModel } from '../../model/cadastro-empenho-model';
import { AppConfigService } from 'src/app/providers/app-config.service';

@Injectable({
  providedIn: 'root',
})
export class EmpenhosService {
  url: string;
  constructor(private http: HttpClient, configService: AppConfigService) {
    this.url = configService.config.baseUrl;
  }

  salvarEmpenho(empenhoModel: EmpenhoModel): Observable<any> {
    return this.http.post(`${this.url}/empenho`, empenhoModel);
  }

  listarEmpenhos(idContrato: any) {
    return this.http.get(
      `${this.url}/empenho/contrato/${idContrato}`
    );
  }

  getByIdEmpenho(idEmpenho: any) {
    return this.http.get(`${this.url}/empenho/${idEmpenho}`);
  }

  editarEmpenho(empenho: EmpenhoModel, idEmpenho: any): Observable<any> {
    return this.http.put<any>(
      `${this.url}/empenho/${idEmpenho}`,
      empenho,
      idEmpenho
    );
  }

  vincularEmpenhos(data: any) {
    return this.http.post(`${this.url}/empenho`, data);
  }

  removerEmpenho(data: any) {
    return this.http.post(`${this.url}/empenho/remover`, data);
  }

  pesquisarEmpenhos(numeroEmpenho: number | string) {
    return this.http.get(
        `${this.url}/empenho/numero/${numeroEmpenho}`
      );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { EmpenhoModel } from '../../model/cadastro-empenho-model';
import { AppConfigService } from 'src/app/providers/app-config.service';

@Injectable({
  providedIn: 'root',
})
export class CadastroEmpenhoService {
  url: string;
  constructor(private http: HttpClient, configService: AppConfigService) {
    this.url = configService.config.baseUrl;
  }

  salvarEmpenho(data: any): Observable<any> {
    return this.http.post(`${this.url}/empenho/cadastro`, data);
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
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from 'src/app/providers/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class TermoDefinitivoService {
  public url: string;
  public idContrato: string | number;
  public contrato: any;
  constructor(private http: HttpClient, configService: AppConfigService) { 
      this.url = configService.config.baseUrl;
  }

  listaTermoRecebimento(idContrato: string): Observable<any> {
      return this.http.get(
          `${this.url}/termo-recebimento-definitivo/contrato/${idContrato}`);
  }
  salvarTermoRecebimento(data: any) {
    return this.http.post(`${this.url}/termo-recebimento-definitivo`, data);
  }

  consultarContrato(idContrato: any) {
    return this.http.get(`${this.url}/termo-recebimento/contrato/dados/${idContrato}`);
  }
  consultarTermoRecebimento(idContrato: any) {
    return this.http.get(`${this.url}/termo-recebimento-definitivo/${idContrato}`);
  }

  editarTermoRecebimento(id: any, data: any) {
    return this.http.put(`${this.url}/termo-recebimento-definitivo/${id}`, data);
  }

  excluirTermoRecbimento(id: any) {
    return this.http.delete(`${this.url}/termo-recebimento-definitivo/${id}`);
  }
  exluirNF(id: any) {
    return this.http.delete(`${this.url}/termo-recebimento-definitivo/nota/${id}`);
  }
  removerEmpenho(data: any) {
    return this.http.post(`${this.url}/termo-recebimento-definitivo/empenho/remover`, data);
  }
  finalizar(id: any) {
    return this.http.put(`${this.url}/termo-recebimento-definitivo/finalizar/${id}`, null);
  }
}

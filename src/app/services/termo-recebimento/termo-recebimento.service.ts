import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from 'src/app/providers/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class TermoRecebimentoService {
  public url: string;
  public idContrato: string | number;
  public contrato: any;
  constructor(private http: HttpClient, configService: AppConfigService) { 
      this.url = configService.config.baseUrl;
  }

  listaTermoRecebimento(idContrato: string): Observable<any> {
      return this.http.get(
          `${this.url}/termo-recebimento/contrato/${idContrato}`);
  }

  removerTermoRecebimento(id: any) {
    return this.http.delete(`${this.url}/termo-recebimento/${id}`);
}
  salvarTermoRecebimento(data: any) {
    return this.http.post(`${this.url}/termo-recebimento`, data);
  }

  consultarContrato(idContrato: any) {
    return this.http.get(`${this.url}/termo-recebimento/contrato/dados/${idContrato}`);
  }
  consultarTermoRecebimento(idContrato: any) {
    return this.http.get(`${this.url}/termo-recebimento/${idContrato}`);
  }

  editarTermoRecebimento(id: any, data: any) {
    return this.http.put(`${this.url}/termo-recebimento/${id}`, data);
  }

  excluirTermoRecbimento(id: any) {
    return this.http.delete(`${this.url}/termo-recebimento/${id}`);
  }
}

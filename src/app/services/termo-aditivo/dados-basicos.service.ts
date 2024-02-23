import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfigService } from 'src/app/providers/app-config.service';

@Injectable({
  providedIn: 'root',
})
export class TDadosBasicosService {
  url: string;
  constructor(private http: HttpClient, configService: AppConfigService) {
    this.url = configService.config.baseUrl;
  }

  salvar(data: any): Observable<any> {
    return this.http.post(`${this.url}/ajuste/termo-aditivo`, data);
  }
  editar(data: any, id: string | number): Observable<any> {
    return this.http.put(`${this.url}/ajuste/termo-aditivo/${id}`, data);
  }

  removerProcesso(idProcesso: any){
    return this.http.delete(`${this.url}/contrato/processo/${idProcesso}`);
  }

  getContrato(idContrato: any) {
    return this.http.get(`${this.url}/contrato/${idContrato}`);
  }
  getTermoAditivo(id: any) {
    return this.http.get(`${this.url}/ajuste/${id}`);
  }
}

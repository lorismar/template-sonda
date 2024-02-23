import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from 'src/app/providers/app-config.service';
@Injectable({
  providedIn: 'root'
})
export class TermoAditivoService {
  public url: string;
  public contrato: any;
  public info: any;
  constructor(private http: HttpClient, configService: AppConfigService) { 
      this.url = configService.config.baseUrl;
  }
  getFornecedor(idContrato: string | number){
    return this.http.get(`${this.url}/termo-aditivo/fornecedor-contrato/${idContrato}`);
  }
  getTermoAditivo(idTermoAditivo: string | number){
    return this.http.get(`${this.url}/termo-aditivo/${idTermoAditivo}`);
  }
  salvarTermoAditivo(data: any){
    return this.http.post(`${this.url}/termo-aditivo`, data);
  }
  editarTermoAditivo(data: any, idTermoAditivo: any){
    return this.http.put(`${this.url}/termo-aditivo/${idTermoAditivo}`, data);
  }
  removerItem(idAcaoTermoAditivo: any){
    return this.http.delete(`${this.url}/termo-aditivo/acao/${idAcaoTermoAditivo}`)
  }
  getItemQD(idContrato: string | number) {
    return this.http.get(`${this.url}/termo-aditivo/itens-contrato/${idContrato}`);
  }
  finalizar(data: any){
    return this.http.put(`${this.url}/termo-aditivo/finalizar`, data);
  }
}
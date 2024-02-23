import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from 'src/app/providers/app-config.service';
@Injectable({
  providedIn: 'root'
})
export class ArquivoService {
  public url: string;
  public contrato: any;
  public info: any;
  constructor(private http: HttpClient, configService: AppConfigService) { 
      this.url = configService.config.baseUrl;
  }
  getArquivos(idContrato: any){
    return this.http.get(`${this.url}/arquivo/contrato/${idContrato}`);
  }
  salvarArquivo(data: any){
    return this.http.post(`${this.url}/arquivo`, data);
  }
  editarArquivo(data: any, idArquivo: any){
    return this.http.put(`${this.url}/arquivo/${idArquivo}`, data);
  }
  removerArquivo(idArquivo: any){
    return this.http.delete(`${this.url}/arquivo/${idArquivo}`)
  }
}
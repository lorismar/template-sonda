import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment  } from "../../../environments/environment";
import { AppConfigService } from 'src/app/providers/app-config.service';



@Injectable({
  providedIn: 'root'
})
export class GestoresService {
  url: string;

  constructor(private http: HttpClient, configService: AppConfigService) {
    this.url = configService.config.baseUrl;
   }
  getGestores(nome: string, ): Observable<any> {
    return this.http.get<any>(`${this.url}/egesp/usuario?nome=${nome}`);
  }

  getFiscais(nome: string): Observable<any> {
    return this.http.get<any>(`${this.url}/egesp/usuario?nome=${nome}`);
  }

  getUnidades(nome: string): Observable<any> {
    return this.http.get<any>(`${this.url}/egesp/unidade?nome=${nome}`);
  }

  cadastrarGestoresContrato(dados: any): Observable<any> {
    return this.http.post(`${this.url}/gestor`, dados);
  }

  getDadosGestores(idContrato: any): Observable<any> {
    return this.http.get(`${this.url}/gestor/contrato/${idContrato}`);
  }

  putEditarGestores(dados: any): Observable<any> {
    return this.http.put(`${this.url}/gestor`, dados);
  }

  deleteGestor(idGestorContrato: string | number): Observable<any> {
    return this.http.delete(`${this.url}/gestor/${idGestorContrato}`);
  }

}

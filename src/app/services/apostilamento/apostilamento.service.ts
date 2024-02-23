import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from 'src/app/providers/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class ApostilamentoService {
    public url: string;
    public idContrato: string | number;
    public contrato: any;
    public gestores: any;
    public info: any;
    constructor(private http: HttpClient, configService: AppConfigService) { 
        this.url = configService.config.baseUrl;
    }

    getAPByContrato(idContrato: string): Observable<any> {
        return this.http.get(
            `${this.url}/apostilamento/contrato/${idContrato}`);
    }

    getApostilamento(id: any) {
        return this.http.get(`${this.url}/apostilamento/${id}`);
    }
    editar(id: string, data: any) {
        return this.http.put(`${this.url}/apostilamento/${id}`, data);
      }

    salvar(data: any) {
    return this.http.post(`${this.url}/apostilamento`, data);
    }
    finalizar(data: any){
        return this.http.put(`${this.url}/apostilamento/finalizar`, data);
    }
    removerItem(idAcaoTermoAditivo: any){
        return this.http.delete(`${this.url}/apostilamento/item/${idAcaoTermoAditivo}`)
    }

}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from 'src/app/providers/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {
    public url: string;
    public idContrato: string | number;
    constructor(private http: HttpClient, configService: AppConfigService) { 
        this.url = configService.config.baseUrl;
    }

    export(ano: string | number, mes: string | number): Observable<any> {
        return this.http.get(`${this.url}/exportacao/contrato?anoMes=${ano}${mes}`, {
            responseType: 'text'
        });
    }

    exportAjuste(ano: string | number, mes: string | number): Observable<any> {
        return this.http.get(`${this.url}/exportacao/ajuste?anoMes=${ano}${mes}`, {
            responseType: 'text'
        });
    }

    getFundamentos(tipo: string){
        return this.http.get(`${this.url}/fundamento-licitacao?tipo=${tipo}`);
    }

}
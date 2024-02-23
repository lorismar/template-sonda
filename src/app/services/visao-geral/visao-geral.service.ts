import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from 'src/app/providers/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class VisaoGeralService {
    public url: string;
    public idContrato: string | number;
    public contrato: any;
    constructor(private http: HttpClient, configService: AppConfigService) { 
        this.url = configService.config.baseUrl;
    }

    getVisaoGeral(idContrato: string): Observable<any> {
        return this.http.get(
            `${this.url}/contrato/saldo/${idContrato}`);
    }


}
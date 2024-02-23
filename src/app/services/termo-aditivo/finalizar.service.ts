import { environment } from 'src/environments/environment.dev';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from 'src/app/providers/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class TFinalizarService {
  url: string;
  constructor(private http: HttpClient, configService: AppConfigService) { 
    this.url = configService.config.baseUrl;
  }

  getResumoTA(idAjusteContrato: any): Observable<any> {
    return this.http.get(`${this.url}/ajuste/resumo/${idAjusteContrato}`);
  }

  finalizarTA(idAjusteContrato: any): Observable<any> {
    return this.http.put(`${this.url}/ajuste/finalizar/${idAjusteContrato}`, idAjusteContrato);
  }

}


import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from 'src/app/providers/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class FornecedoresService {
    public url: string;
    public seo: string;
    public idContrato: string | number;
    constructor(private http: HttpClient, configService: AppConfigService) { 
        this.url = configService.config.baseUrl;
        this.seo = configService.config.seoUrl;
    }

    setParams(params: any): HttpParams {
        let httpParams = new HttpParams();
        for (const key in params) {
          if (params[key] !== undefined && params[key] !== null) {
            httpParams = httpParams.set(key, String(params[key]));
          }
        }
        return httpParams;
      }

    pesquisarFornecedor(page: number, size: number, params: any): Observable<any> {
        const url = `${this.seo}/fornecedor?size=${size}&page=${page}`;
        const httpParams = this.setParams(params);
        return this.http.get(url, {  params: httpParams, responseType: 'json' });
      }

}


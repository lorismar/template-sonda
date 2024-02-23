import { environment } from 'src/environments/environment.dev';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuadroDemonstrativoModel } from 'src/app/model/quadroDemonstrativo-model';
import { AppConfigService } from 'src/app/providers/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class QuadroDemonstrativoService {
  url: string;
  constructor(private http: HttpClient, configService: AppConfigService) { 
    this.url = configService.config.baseUrl;
  }

  getAllListaItens(idContrato: any): Observable<any> {
    return this.http.get(`${this.url}/quadro-demonstrativo/contrato/${idContrato}`)
  }

  postItensQD(itensQD: any): Observable<any>{
    return this.http.post(`${this.url}/quadro-demonstrativo`, itensQD)
  }

  putItensQD(itensQD: any, idContrato: any): Observable<any> {
    return this.http.put(`${this.url}/quadro-demonstrativo`, itensQD);
  }

  getItemQDById(idItemQuadroDemos: any): Observable<any> {
    return this.http.get(`${this.url}/quadro-demonstrativo/${idItemQuadroDemos}`)
  }

  deleteListaQuadroDemostrativo(idContrato: any): Observable<any> {
    return this.http.delete(`${this.url}/quadro-demonstrativo/contrato/${idContrato}`)
  }
  deleteItemQD(idItemQuadroDemostrativo: any): Observable<any> {
    return this.http.delete(`${this.url}/quadro-demonstrativo/${idItemQuadroDemostrativo}`)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from 'src/app/providers/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class OrdemFornecimentoService {
    public url: string;
    public idContrato: string | number;
    public contrato: any;
    constructor(private http: HttpClient, configService: AppConfigService) { 
        this.url = configService.config.baseUrl;
    }

    listaOrdemFornecimento(idContrato: string): Observable<any> {
        return this.http.get(
            `${this.url}/ordem-fornecimento/contrato/${idContrato}`);
    }
    getOrdemFornecimento(id: any) {
        return this.http.get(`${this.url}/ordem-fornecimento/${id}`);
    }
    getItensOrdemFornecimento(id: any) {
        return this.http.get(`${this.url}/ordem-fornecimento/contrato/itens/${id}`);
    }
    removerItemOrdemFornecimento(id: any) {
        return this.http.delete(`${this.url}/ordem-fornecimento/item/${id}`);
    }
    removerOrdemFornecimento(id: any) {
        return this.http.delete(`${this.url}/ordem-fornecimento/${id}`);
    }
    removerPacote(id: any) {
        return this.http.delete(`${this.url}/ordem-fornecimento/pacote/${id}`);
    }
    salvarOrdemFornecimento(data: any) {
        return this.http.post(`${this.url}/ordem-fornecimento`, data);
      }
    editarOrdemFornecimento(id: any, data: any) {
        return this.http.put(`${this.url}/ordem-fornecimento/${id}`, data);
    }
    enviarDocumentoSEI(data: any) {
        return this.http.post(`${this.url}/ordem-fornecimento/enviar-documento`, data);
    }
    finalizarOrdemFornecimento(id: any) {
        return this.http.put(`${this.url}/ordem-fornecimento/finalizar/${id}`, null);
    }

}
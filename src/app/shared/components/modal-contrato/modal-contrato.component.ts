import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApostilamentoService } from 'src/app/services/apostilamento/apostilamento.service';
import { ContratosService } from 'src/app/services/contratos/lista-contratos.service';

@Component({
  selector: 'app-modal-contrato',
  templateUrl: './modal-contrato.component.html',
  styleUrls: ['./modal-contrato.component.css']
})
export class ModalContratoComponent {
  public idContrato: number | string;
  public numeroContrato: number | null;
  public search: boolean;
  public contratos: any[];
  public loading: boolean;
  private bouncer: any;
  public form: FormGroup;


  constructor(
    private contratosService: ContratosService,
    private apostilamentoService: ApostilamentoService,
    public modal: NgbActiveModal
    ) {
  }


  salvarContrato() {
  }

  selecionarContrato(contrato: any) {
    this.modal.close(contrato);
  }

  buscarContratos(event: any) {
    clearTimeout(this.bouncer);
    this.bouncer = setTimeout(() => {
      this.getContratos(event.target.value);
    }, 400); 
  }

  getContratos(query: string) {
    this.loading = true;
    this.contratosService.pesquisarContratos({
      page: 0,
      size: 20,
      sort: 'numeroContrato',
      direction: 'desc',
      status: 'ASSINADO',
      numeroContrato: query
    }).subscribe({
      next: (data) => {
        this.loading = false;
        if(data.content.length > 0) {
          this.contratos = data.content;
          this.search = true;
        }else {
          this.contratos = [];
        }
      }
    })
  }


}

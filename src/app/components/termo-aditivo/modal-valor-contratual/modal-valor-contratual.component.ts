import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilsService } from 'src/app/services/geral/utils.service';
import { TermoAditivoService } from 'src/app/services/termo-aditivo/termo-aditivo.service';

@Component({
  selector: 'app-modal-valor-contratual',
  templateUrl: './modal-valor-contratual.component.html',
  styleUrls: ['./modal-valor-contratual.component.scss']
})
export class ModalValorContratualComponent implements OnInit {
  @Input() data?: any
  @Input() contrato: any
  public loading: boolean = false;
  public valor: number;
  public percentual: number;
  constructor(
    public activeModal: NgbActiveModal,
    public termoAditivoService: TermoAditivoService,
    private utils: UtilsService
    ) {}
  ngOnInit(): void {
    if(this.data){
      this.valor = this.data.acaoTrocaValor.valorTermoAditivo;
      this.percentual = this.data.acaoTrocaValor.percentualAjustado;
    }
  }

  calcValor() {
    this.valor = this.utils.arred(this.percentual * this.contrato.valorTotal / 100, 2);
  }

  calcPorcentagem() {
    this.percentual = this.utils.arred(this.valor * 100 / this.contrato.valorTotal, 2);
  }

  get valorReajustado() {
    return this.valor ? this.contrato.valorTotal + this.valor : this.contrato.valorTotal;
  }


  confirmSelection() {
    this.activeModal.close({valorTermoAditivo: this.valor, percentualAjustado: this.percentual, valorContratoAtualizado: this.valorReajustado});
  }
}

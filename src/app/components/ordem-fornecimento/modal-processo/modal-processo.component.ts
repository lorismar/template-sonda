import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-processo',
  templateUrl: './modal-processo.component.html',
  styleUrls: ['./modal-processo.component.scss']
})
export class ModalProcessoComponent {
  @Input() processos: any[];

  selectedProcesso: any;

  constructor(public activeModal: NgbActiveModal) { }

  confirmSelection() {
    const find = this.processos.find((item: any) => item.numeroProcesso == this.selectedProcesso)
    this.activeModal.close(find);
  }
}

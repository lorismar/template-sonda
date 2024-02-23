import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-visualizar-gestores',
  templateUrl: './modal-visualizar-gestores.component.html',
  styleUrls: ['./modal-visualizar-gestores.component.scss']
})
export class ModalVisualizarGestoresComponent {
@Input() antigosGestores: any[];
@Input() novosGestores: any[]
public tipos: any = {
  "GESTOR": "Gestor",
  "FISCAL_TECNICO": "Fiscal Tecnico",
  "FISCAL_ADMINISTRATIVO": "Fiscal Administrativo",
  "FISCAL_DEMANDANTE": "Fiscal Demandante"
}
constructor(public activeModal: NgbActiveModal){

}
}

import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faBroom } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-modal-item-of',
  templateUrl: './modal-item-of.component.html',
  styleUrls: ['./modal-item-of.component.scss']
})
export class ModalItemOFComponent implements OnInit{
@Input() quadroDemonstrativo: any
public faBroom = faBroom;

  constructor(
    public modal: NgbActiveModal,
    private toastr: ToastrService
    ) {
    
  }

  ngOnInit(): void {
    console.log(this.quadroDemonstrativo)
  }

  salvar() {
    this.modal.close(this.quadroDemonstrativo);
  }

  limpar(item: any) {
    delete item.quantidadeSolicitada;
  }

  amount(event: any ,item: any) {
    if(event.target.value > item.saldoItem) {
      item.quantidadeSolicitada = item.saldoItem;
      this.toastr.warning('Quantidade reajustada, ultrapassou o saldo da ata!');
    }
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TermoAditivoService } from 'src/app/services/termo-aditivo/termo-aditivo.service';

@Component({
  selector: 'app-modal-suspensao',
  templateUrl: './modal-suspensao.component.html',
  styleUrls: ['./modal-suspensao.component.scss']
})
export class ModalSuspensaoComponent implements OnInit {
  @Input() data?: any
  @Input() contrato: any
  @Input() info: any
  public loading: boolean = false;
  public tipoSuspensao: string = '';
  public dataSuspensao: number;
  constructor(
    public activeModal: NgbActiveModal,
    public termoAditivoService: TermoAditivoService,
    ) {}


  ngOnInit(): void {
    if(this.data){
      console.log(this.data)
      this.tipoSuspensao = this.data.acaoSuspensao.tipoSuspensao;
      this.dataSuspensao = this.data.acaoSuspensao.dataSuspensao;
      console.log(this.tipoSuspensao, this.dataSuspensao)
    }
  }

  confirmSelection() {
    this.activeModal.close({tipoSuspensao: this.tipoSuspensao, dataSuspensao: this.dataSuspensao});
  }


}

import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContratosService } from 'src/app/services/contratos/lista-contratos.service';
import { TermoAditivo } from 'src/app/types/termo-aditivo';
import { faPenToSquare, faTrashCan, faPlus, faCircleXmark, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { TermoAditivoService } from 'src/app/services/termo-aditivo/termo-aditivo.service';
import { Router } from '@angular/router';
import { ListaTAService } from 'src/app/services/termo-aditivo/lista-ta.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.component';
import { ApostilamentoService } from 'src/app/services/apostilamento/apostilamento.service';
import { Apostilamento } from 'src/app/types/apostilamento';

@Component({
  selector: 'app-modal-ta',
  templateUrl: './modal-ap.component.html',
  styleUrls: ['./modal-ap.component.scss']
})
export class ModalApComponent implements OnInit {
  @Input() contrato: any;
  public faCheckCircle = faCheckCircle;
  public faCircleXmark = faCircleXmark;
  public query: string;
  public apostilamentos: Apostilamento[];
  public faPenToSquare = faPenToSquare;
  public faTrashCan = faTrashCan;
  public faPlus = faPlus;
  public loading: boolean = false;
  public codUC: { [key: string]: string }  = { 
    'TJRO_00001': '00001 - TJRO',
    'FUJU_03011': '03011 - FUJU'
  }
  public tipoTA: { [key: string]: string }  = {
    'PRAZO': 'Prazo',
    'VALOR': 'Valor',
    'PRAZO_E_VALOR': 'Prazo e Valor',
    'OUTROS': 'Outros'
  }
  public tiposApostilamento: { [key: string]: string }   = {
    "GESTORES_OU_FISCAIS": "Gestores e/ou Fiscais",
    "CORRECAO_ERRO_MATERIAL": "Correção de Erro Material",
    "VALOR": "Valor",
    "OUTROS": "Outros"
  }

  constructor(
    public modal: NgbActiveModal, 
    private apostilamentoService: ApostilamentoService,
    private listaTAService: ListaTAService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal) {

  }

  ngOnInit(): void {
    this.query = this.contrato.numeroContrato;
    this.getList();
    console.log(this.contrato);
  }

  setAP() {
    this.apostilamentoService.idContrato = this.contrato.idContrato;
    this.apostilamentoService.contrato = this.contrato;
    this.modal.close();
    this.router.navigate(['/home/apostilamento'])
  }

  getList() {
    this.loading = true;
    this.apostilamentoService.getAPByContrato(this.contrato.idContrato).subscribe({
      next: (data: TermoAditivo[]) => {
        this.apostilamentos = data;
        console.log(data);
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
      }
    })
  }

  remover(item: any) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent);
    modalRef.componentInstance.title = 'Excluir Apostilamento'
    modalRef.componentInstance.body = 'Deseja excluir o Apostilamento?'
    modalRef.closed.subscribe((data) => {
      if(data) {
        this.listaTAService.delete(item.idAjusteContrato).subscribe({
          next: () => {
            this.toastr.success('AP excluido com Sucesso!')
            this.getList();
          },
          error: (error) => {
            console.log(error);
            this.toastr.error(error);
          }
        })
      }
    })
  }

}

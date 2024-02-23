import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faCheckCircle, faCircleXmark, faPenToSquare, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TermoDefinitivoService } from 'src/app/services/termo-definitivo/termo-definitivo.service';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-modal-trd',
  templateUrl: './modal-trd.component.html',
  styleUrls: ['./modal-trd.component.scss']
})
export class ModalTrdComponent {
[x: string]: any;

  @Input() contrato: any;
  public faPenToSquare = faPenToSquare;
  public faTrashCan = faTrashCan;
  public faPlus = faPlus;
  public faCircleXmark = faCircleXmark;
  public faCheckCircle = faCheckCircle
  public termos: any[] = [];
  public loading: boolean = false;
  public query: string;
  public constatacao: any = {
    REGULAR: 'Regular',
    INREGULAR: 'Inregular'
  }

  constructor(  
    public modal: NgbActiveModal, 
    private termoDefinitivo: TermoDefinitivoService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal) {
    
  }

  ngOnInit(): void {
    this.query = this.contrato.numeroContrato;
    this.getList();
  }

  getList() {
    this.loading = true;
    this.termoDefinitivo.listaTermoRecebimento(this.contrato.idContrato).subscribe({
      next: (data: any[]) => {
        this.termos = data;
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
    modalRef.componentInstance.title = 'Excluir Termo de Recebimento'
    modalRef.componentInstance.body = 'Deseja excluir a Termo de Recebimento Definitivo?'
    modalRef.closed.subscribe((data) => {
      if(data) {
        this.termoDefinitivo.excluirTermoRecbimento(item.idTermoRecebimentoDefinitivo).subscribe({
          next: () => {
            this.toastr.success('Termo de Recebimento excluído com sucesso!')
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

  setOrdem() {
    this.termoDefinitivo.idContrato = this.contrato.idContrato;
    this.termoDefinitivo.contrato = this.contrato;
    this.modal.close();
    this.router.navigate(['/home/termo-definitivo'])
  }

}

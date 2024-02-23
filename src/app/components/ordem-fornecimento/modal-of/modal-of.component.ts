import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPenToSquare, faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { OrdemFornecimentoService } from 'src/app/services/ordem-fornecimento/ordem-fornecimento.service';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-modal-of',
  templateUrl: './modal-of.component.html',
  styleUrls: ['./modal-of.component.scss']
})
export class ModalOfComponent implements OnInit {
  @Input() contrato: any;
  public faPenToSquare = faPenToSquare;
  public faTrashCan = faTrashCan;
  public faPlus = faPlus;
  public ordens: any[] = [];
  public loading: boolean = false;
  public query: string;

  constructor(  
    public modal: NgbActiveModal, 
    private ordemFornecimentoService: OrdemFornecimentoService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal) {
    
  }

  ngOnInit(): void {
    this.query = this.contrato.numeroContrato;
    this.getList();
    console.log(this.contrato);
  }

  getList() {
    this.loading = true;
    this.ordemFornecimentoService.listaOrdemFornecimento(this.contrato.idContrato).subscribe({
      next: (data: any[]) => {
        this.ordens = data;
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
    modalRef.componentInstance.title = 'Excluir Ordem de Fornecimento'
    modalRef.componentInstance.body = 'Deseja excluir a Ordem de Fornecimento?'
    modalRef.closed.subscribe((data) => {
      if(data) {
        this.ordemFornecimentoService.removerOrdemFornecimento(item.idOrdemFornecimento).subscribe({
          next: () => {
            this.toastr.success('Ordem de Fornecimento excluída com sucesso!')
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
    this.ordemFornecimentoService.idContrato = this.contrato.idContrato;
    this.ordemFornecimentoService.contrato = this.contrato;
    this.modal.close();
    this.router.navigate(['/home/ordem-fornecimento'])
  }



}

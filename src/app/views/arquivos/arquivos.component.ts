import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { faPenToSquare, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalArquivoComponent } from 'src/app/components/arquivos/modal-arquivo/modal-arquivo.component';
import { ConfirmationDialogComponent } from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.component';
import { ArquivoService } from 'src/app/services/arquivos/arquivos.service';
import { ModalContratoComponent } from 'src/app/shared/components/modal-contrato/modal-contrato.component';

@Component({
  selector: 'app-arquivos',
  templateUrl: './arquivos.component.html',
  styleUrls: ['./arquivos.component.scss']
})
export class ArquivosComponent implements OnInit{
  public faPlus = faPlus;
  public faPenToSquare = faPenToSquare;
  public faTrashAlt = faTrashAlt;
  public idContrato: any;
  public numeroContrato: any;
  public loading: boolean = false;
  public arquivos: any[] = [];
  public sort: string = '';
  public direction: string = '';
  public size: number = 10;
  public page: number = 1;
  public totalElements: number = 10;
  constructor(
    private arquivosService: ArquivoService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.idContrato = this.activatedRoute.snapshot.params['idContrato'];
  }

  ngOnInit(): void {
    if(!this.idContrato) {
      this.openModal();
    }else {
      this.getArquivos();
    }
  }

  incluirArquivo() {
    const modal = this.modalService.open(ModalArquivoComponent);
    modal.componentInstance.idContrato = this.idContrato;
    modal.closed.subscribe({
      next: (data) => {
        if(data) this.getArquivos();
      }
    })
  }

  editarArquivo(arquivo: any) {
    const modal = this.modalService.open(ModalArquivoComponent);
    modal.componentInstance.idContrato = this.idContrato;
    modal.componentInstance.arquivo = arquivo;
    modal.closed.subscribe({
      next: (data) => {
        this.getArquivos();
      }
    })
  }

  excluirArquivo(idArquivo: any) {
    const modal = this.modalService.open(ConfirmationDialogComponent);
    modal.componentInstance.title = 'Excluir Arquivo'
    modal.componentInstance.body = 'Deseja realmente excluir o arquivo desse contrato?'
    modal.closed.subscribe({
      next: (confirm) => {
        if(confirm) {
          this.loading = true;
          this.arquivosService.removerArquivo(idArquivo).subscribe({
            next: (response) => {
              this.toastr.success('Arquivo removido com sucesso!')
              this.getArquivos();
            },
            error: (err) => {
              this.toastr.error(err);
            },
            complete: () => {
              this.loading = false;
            }
          })
        }
      }
    })
  }

  filtroLista(column: string) {

  }

  openModal() {
    const modal = this.modalService.open(ModalContratoComponent);
    modal.closed.subscribe({
      next: (data) => {
        if(data) this.router.navigate(['/home/arquivos/', data.idContrato]);
      }
    })
  }

  getArquivos() {
    this.loading = true;
    this.arquivosService.getArquivos(this.idContrato).subscribe({
      next: (data: any) => {
        this.arquivos = data;
        console.log(data);
      },
      error: (err) => {
        this.toastr.error(err);
      },
      complete: () => {
        this.loading = false;
      }
    })
  }
}

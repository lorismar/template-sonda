import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ArquivoService } from 'src/app/services/arquivos/arquivos.service';

@Component({
  selector: 'app-modal-arquivo',
  templateUrl: './modal-arquivo.component.html',
  styleUrls: ['./modal-arquivo.component.scss']
})
export class ModalArquivoComponent implements OnInit{
  @Input() idContrato: number;
  @Input() arquivo: any;
  public idArquivo: any;
  public tipoDocumento: string = '';
  public pathArquivo: string = '';
  public dataAssinaturaDocumento: string = '';
  public loading: boolean = false;
  constructor(
    public activeModal: NgbActiveModal,
    private arqvuioService: ArquivoService,
    private toastr: ToastrService
    ) {}

  ngOnInit(): void {
    if(this.arquivo) {
      this.idArquivo = this.arquivo.idArquivo;
      this.tipoDocumento = this.arquivo.tipoDocumento;
      this.pathArquivo = this.arquivo.pathArquivo;
      this.dataAssinaturaDocumento = this.arquivo.dataAssinaturaDocumento;
    }
  }

  confirm() {
    if(this.idContrato && this.tipoDocumento && this.pathArquivo) {
      this.loading = true;
      const data: any = {
        idContrato: +this.idContrato, 
        tipoDocumento: this.tipoDocumento, 
        pathArquivo: this.pathArquivo,
        dataAssinaturaDocumento: this.dataAssinaturaDocumento
      }
      if(this.idArquivo) {
        this.arqvuioService.editarArquivo(data, this.idArquivo).subscribe({
          next: () => {
            this.toastr.success('Arquivo editado com sucesso!')
            this.activeModal.close();
          },
          error: (err) => {
            this.toastr.error(err);
          },
          complete: () => {
            this.loading = false;
          }
        })
      }else {
        this.arqvuioService.salvarArquivo(data).subscribe({
            next: (response: any) => {
              if(response) {
                this.toastr.success('Arquivo salvo com sucesso!')
                data.idArquivo = response.id
                this.activeModal.close(response);
              }
              
            },
            error: (err) => {
              this.toastr.error(err);
            },
            complete: () => {
              this.loading = false;
            }
          })
       }
    }else {
      this.toastr.error('Formulário inválido!')
    }
  }
}

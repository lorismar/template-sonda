import { Component, OnInit, ViewChild } from '@angular/core';
import {
  faFileDownload,
  faFileUpload,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { ArquivosService } from 'src/app/services/contratos/arquivos.service';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { CadastroContratosService } from 'src/app/services/contratos/cadastro-constratos.service';
import { UtilsService } from 'src/app/services/geral/utils.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
export let arquivosStteper = false;

@Component({
  selector: 'app-arquivos',
  templateUrl: './arquivos.component.html',
  styleUrls: ['./arquivos.component.css'],
})
export class ArquivosComponent implements OnInit {
  @ViewChild('closebutton') closebutton: {
    nativeElement: { click: () => void };
  }; // Ação para fechar a modal

  faFileUpload = faFileUpload;
  faFileDownload = faFileDownload;
  faTrash = faTrash;
  selectedFiles?: FileList;
  previews: string[] = [];

  public idContrato: any;
  public arquivos: any;
  public loading = false;
  fileName: any;
  idArquivo: any;
  arquivosValidado = false;
  public editandoContrato: any;
  editando: boolean;
  private idContratoViaRota: ActivatedRouteSnapshot;

  constructor(
    private arquivosService: ArquivosService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public formService: CadastroContratosService,
    private utils: UtilsService,
    private modalService: NgbModal
  ) {
    this.idContrato = this.activatedRoute.snapshot.params['idContrato'];
  }

  ngOnInit(): void {
    if (this.formService.listaArquivos.length > 0) {
      this.arquivosValidado = true;
      arquivosStteper = true;
    }
  }
  fileUpload(event: any) {
    this.selectedFiles = event.target.files;
    this.previews = [];
    if (this.selectedFiles) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const file = this.selectedFiles[i];
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        const executableExtensions = ['exe', 'bat', 'cmd', 'sh', 'js', 'jar', 'msi'];
        if (fileExtension && executableExtensions.includes(fileExtension)) {
          this.toastr.error('Arquivos executáveis não são permitidos.');
          return;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
      this.loadingFiles();
    }
  }
  
  

  loadingFiles(): void {
    this.loading = true;
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(this.selectedFiles[i]);
      }
    }
  }

  upload(file: File): void {
    if(this.idContrato && this.idContrato != 'novo') {
      if (file) {
        this.loading = true;
        const formData: FormData = new FormData();
        formData.append('file', file),
        formData.append('idContrato', this.idContrato);
        this.arquivos = formData;
      }
  
      this.arquivosService.postArquivos(this.arquivos).subscribe({
        next: (e) => {
          this.toastr.success('Arquivo(s) carregado(s) com sucesso');
          this.loading = false;
          this.formService.getAllArquivosContrato(this.idContrato);
        },
        error: (error) => {
          this.loading = false;
          this.toastr.error('O tamanho do arquivo excede o limite maximo de 1MB');
        }
      });
    }else {
      const dadosBasicosForm = this.formService.getForm('dadosBasicos');
      this.utils.markFormGroupTouched(dadosBasicosForm);
      this.toastr.error('Preencha e salve os dados básicos antes de continuar.');
      this.router.navigate(['/home/contrato/dados-basicos']);
    }
  }

  downloadArquivos(idArquivo: any) {
    this.loading = true;
    this.arquivosService.getDownloadArquivo(idArquivo).subscribe({
      next: (data: Blob | MediaSource) => {
        this.formService.listaArquivos.forEach((e: any) => {
          // Obtem o nome dos arquivos atraves da lista de arquivos
          if (idArquivo === e.idArquivo) {
            this.fileName = e.nomeArquivo;
          }
        });
        let downloadURL = window.URL.createObjectURL(data);
        saveAs(downloadURL, this.fileName);
        this.loading = false;
      },
      error: (e) => { },
    });
  }


  excluirArquivo(id: string) {
    this.loading = true;
    this.arquivosService.deleteArquivo(id).subscribe({
      next: (data: any) => {
        this.toastr.success('Arquivo excluido com sucesso');
        this.loading = false;
        this.formService.getAllArquivosContrato(this.idContrato);
      },
      error: (err: any) => {
        this.loading = false;
        console.log(err);
      },
    });
  }

  excluir(id: string) {
    const modal = this.modalService.open(ConfirmationDialogComponent);
    modal.componentInstance.title = 'Excluir Arquivo'
    modal.componentInstance.body = 'Deseja excluir o Arquivo?'
    modal.closed.subscribe((data) => {
      if(data) this.excluirArquivo(id);
    })
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApostilamentoService } from 'src/app/services/apostilamento/apostilamento.service';
import { GestoresService } from 'src/app/services/contratos/gestores.service';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-gestores',
  templateUrl: './modal-gestores.component.html',
  styleUrls: ['./modal-gestores.component.scss']
})
export class ModalGestoresComponent implements OnInit{
  @Input() data: any[];
  public faTrash = faTrash;
  public gestores: any[] = [];
  public listaGestores: any[] = [];
  public mostrarLista: boolean = false;
  public buscarGestor: boolean = false;
  private bouncerTimer: any;

  public tipoGestor: string = '';
  public nomeGestor: string = '';
  public gestor: any;

  public tipos: any = {
    "GESTOR": "Gestor",
    "FISCAL_TECNICO": "Fiscal Tecnico",
    "FISCAL_ADMINISTRATIVO": "Fiscal Administrativo",
    "FISCAL_DEMANDANTE": "Fiscal Demandante"
  }
  constructor(
    public activeModal: NgbActiveModal,
    private gestoresService: GestoresService,
    private apostilamentoService: ApostilamentoService,
    public modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if(this.data) this.gestores = this.data;
  }

  confirmSelection() {
    if(this.gestores.length > 0){
      this.activeModal.close(this.gestores);
    }
  }

  callBuscarGestores(event: any): void {
    clearTimeout(this.bouncerTimer);
    this.bouncerTimer = setTimeout(() => {
      this.buscarGestores(event);
    }, 400); 
  }

  buscarGestores(event: any): void {
    const nome = event.target.value;
    if (nome.length >= 3 && !this.buscarGestor) {
      this.buscarGestor = true;
      let aux = [];
      this.gestoresService.getGestores(nome)
      .subscribe((data: any[]) => {
        this.mostrarLista = true;
        this.buscarGestor = false;
        this.listaGestores = data.filter(item => item.situacao === 'Ativo' && item.matricula);
        this.listaGestores.sort(function (a, b) {
          let x = a.nome,
            y = b.nome;
          return x == y ? 0 : x > y ? 1 : -1;
        });
      });
    } else {
      this.listaGestores = [];
    }
  }

  selecionarGestor(gestor: any) {
    this.nomeGestor = gestor.nome;
    this.gestor = gestor;
    this.mostrarLista = false;
  }


  adicionarGestor() {
    this.gestor.tipoGestor = this.tipoGestor;
    this.gestores.push(this.gestor);
    this.nomeGestor = '';
    this.tipoGestor = '';
    this.gestor = null;
    this.listaGestores = [];
  }

  removeGestor(i: number) {
    if(this.gestores[i].idGestorContrato) {
      const modal = this.modalService.open(ConfirmationDialogComponent);
      modal.componentInstance.title = 'Excluir Gestor ou Fiscal?'
      modal.componentInstance.body = 'Deseja realmente excluir o Gestor ou Fiscal dessa motivação?'
      modal.closed.subscribe({
        next: (confirm) => {
          if(confirm) {
            this.gestoresService.deleteGestor(this.gestores[i].idGestorContrato).subscribe({
              next: (data) => {
                this.gestores.splice(i, 1);
                this.toastr.success('Gestor ou Fiscal removido com sucessso!')
              },
              error: (err) => {
                this.toastr.error(err)
              },
              complete: () => {

              }
            })
          }
        }
      })
    }else {
      this.gestores.splice(i, 1);
    }

  }
}

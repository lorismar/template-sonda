import { CadastroEmpenhoService } from '../../../services/contratos/cadastro-empenho.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { faPenToSquare, faTrashCan, faFile } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
export let empen = false
import { CadastroContratosService } from 'src/app/services/contratos/cadastro-constratos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalEmpenhosComponent } from './modal-empenhos/modal-empenhos.component';
import { UtilsService } from 'src/app/services/geral/utils.service';
import { EmpenhosService } from 'src/app/services/contratos/empenhos.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { CadastroEmpenhoNovoComponent } from './cadastro-empenho-novo/cadastro-empenho-novo.component';
@Component({
  selector: 'app-empenhos',
  templateUrl: './empenhos.component.html',
  styleUrls: ['./empenhos.component.css'],
})
export class EmpenhosComponent implements OnInit {
  public faTrashCan = faTrashCan;
  public faFile = faFile;
  public idContrato: any;
  public modalidade: any = {
    "ORDINARIO": 'Ordinário',
    "ESTIMATIVO": 'Estimativo',
    "GLOBAL": 'Global'
  }
  public tipoEmpenho: any = {
    "ORIGINAL": 'Original',
    "REFORCO": 'Reforço',
    "ANULACAO_PARCIAL": 'Anulação Parcial',
    "ANULACAO_TOTAL": 'Anulação Total'
  }
  public documentoOrigem: any = {
    "CONTRATO": 'Contrato',
    "TERMO_ADITIVO": 'Termo Aditivo',
    "APOSTILAMENTO": 'Apostilamento',
    "OUTROS": 'Outros'
  }
  public loading: boolean = false;
  constructor(
    private cadastroEmpenhoService: CadastroEmpenhoService,
    private activatedRoute: ActivatedRoute,
    public formService: CadastroContratosService,
    private modalService: NgbModal,
    public utils: UtilsService,
    private empenhoService: EmpenhosService,
    private toastService: ToastrService,
    private router: Router
  ) {
      this.idContrato = this.activatedRoute.snapshot.params['idContrato'];
  }
  ngOnInit(): void {
  }
  editar(id: any) {
  }
  adicionar() {
    const dadosBasicosForm = this.formService.getForm('dadosbasicos');
    const idContrato = dadosBasicosForm.value.idContrato;
    if(idContrato) {
      const modal = this.modalService.open(ModalEmpenhosComponent);
      modal.closed.subscribe((data) => {
        if (data) {
          const idEmpenhoDesejado = data.idEmpenho;
          const hasDuplicate = this.formService.listaEmpenhosPorContrato.some(
            (item) => item.idEmpenho === idEmpenhoDesejado
          );
          if (!hasDuplicate) {
            this.formService.listaEmpenhosPorContrato.push(data);
          }
        }
      });
    }else {
      this.router.navigate(['/home/contrato/dados-basicos']);
      this.utils.markFormGroupTouched(dadosBasicosForm);
      this.toastService.error('Preencha e salve os dados básicos antes de continuar.');
    }
  }
  
  removerItem(item: any) {
    const modal = this.modalService.open(ConfirmationDialogComponent);
    modal.componentInstance.title = 'Excluir Empenho!'
    modal.componentInstance.body = 'Deseja realmente excluir o empenho desse contrato?'
    modal.closed.subscribe({
      next: (data) => {
        if(data) {
          const index = this.formService.listaEmpenhosPorContrato.indexOf(item);
          this.empenhoService.removerEmpenho({
            idContrato: this.idContrato,
            idEmpenho: item.idEmpenho
          }).subscribe({
            next: (data) => {
              this.toastService.success('Empenho removido com sucesso.');
              this.formService.listaEmpenhosPorContrato.splice(index, 1);
            },
            error: (error) => {
              console.log(error);
              this.toastService.error(error.error.message);
            }
          })
        }
      }
    })
  }

  cadastrarEmpenho() {
    const modal = this.modalService.open(CadastroEmpenhoNovoComponent, {
      size: 'lg'
    });
    modal.closed.subscribe({
      next: (data) => {
        if(data) {
          console.log(data);
          this.formService.listaEmpenhosPorContrato.push(data);
        }
      }
    })
  }

  salvar() {
    if(this.formService.listaEmpenhosPorContrato.length > 0) {
      this.loading = true;
      this.empenhoService.vincularEmpenhos({
        empenhos: this.formService.listaEmpenhosPorContrato,
        idContrato: this.idContrato
      }).subscribe({
        next: (data) => {
            this.cadastroEmpenhoService.listarEmpenhos(this.idContrato);
            this.toastService.success('Empenhos salvos com sucesso.');
            this.formService.progress['empenhos'] = true;
            this.router.navigate(['/home/contrato/finalizar-contrato/' + this.idContrato]);
        },
        error: (error) => {
          this.toastService.error(error);
        },
        complete: () => {
          this.loading = false;
        }
      })
    }else {
      this.router.navigate(['/home/contrato/finalizar-contrato/' + this.idContrato]);
    }

  }
}
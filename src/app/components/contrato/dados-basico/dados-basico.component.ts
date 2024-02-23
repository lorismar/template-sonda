import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DadosBasicosModel } from 'src/app/model/dadosBasicos-model';
import { DadosBasicosService } from 'src/app/services/contratos/dados-basicos.service';
import { CadastroContratosService } from 'src/app/services/contratos/cadastro-constratos.service';
import { UtilsService } from 'src/app/services/geral/utils.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { ModalFornecedoresComponent } from 'src/app/shared/components/modal-fornecedores/modal-fornecedores.component';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { debounceTime } from 'rxjs';
import { IndiceCorrecaoService } from 'src/app/services/indice-correcao/indice-correcao.service';
import { ContratosService } from 'src/app/services/contratos/lista-contratos.service';
import { ContratoService } from 'src/app/services/contratos/contrato.service';
import { ModalSelectComponent } from 'src/app/shared/components/modal-select/modal-select.component';
export let dados_basicos = false;
export let activeStepperCss = true

@Component({
  selector: 'app-dados-basicos',
  templateUrl: './dados-basico.component.html',
  styleUrls: ['./dados-basico.component.css'],
})
export class DadosBasicosComponent implements OnInit {
  btnChecked = {};
  public form: FormGroup;
  public dadosBasicos = new DadosBasicosModel();
  public adicionarCampos: any = [];
  public condicionalSimplificado: boolean = false;
  public condicionalContrato: boolean = false;
  public idContrato: any;
  public targetProcesso: number;
  public faSearch = faSearch;
  public search: boolean = false;
  public loading: boolean = false;
  public indices: any[] = [];
  public fundamentos: any[] = [];
  public fundamentosIn: any[] = [];
  private bouncer: any;

  constructor(
    private dadosBasicosService: DadosBasicosService,
    private router: Router,
    private toastr: ToastrService,
    private formService: CadastroContratosService,
    private utils: UtilsService,
    private modalService: NgbModal,
    private indiceCorrecaoService: IndiceCorrecaoService,
    private contratosService: ContratoService
  ) {
    this.form = this.formService.getForm('dadosBasicos');
  }

  ngOnInit(): void {
    this.form.get('correcao')?.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      if(value === 'S') {
        this.form.get('mesIndiceCorrecao')?.enable();
        this.form.get('indiceCorrecao')?.enable();
        this.form.get('idIndiceCorrecao')?.enable();
      }else {
        this.form.get('mesIndiceCorrecao')?.disable();
        this.form.get('indiceCorrecao')?.disable();
        this.form.get('idIndiceCorrecao')?.disable();
      }
    })
    this.form.get('adesaoArp')?.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      if(value === 'S') this.form.get('numeroAtaRegistroPrecos')?.enable();
      else this.form.get('numeroAtaRegistroPrecos')?.disable();
    })
    this.getIndices('');
    this.getFundamentos();
    this.getFundamentosIn();
  }

  cleanModalidade(event: any) {
    this.form.patchValue({
      fundamentoLicitacao: null
    })
  }

  selecionarIndice(indice: any) {
    console.log(indice);
    this.form.patchValue({
      indiceCorrecao: indice.nome,
      idIndiceCorrecao: indice.idIndiceCorrecao
    });
    this.search = false;
    this.loading = false;
  }

  buscarIndices(event: any) {
    clearTimeout(this.bouncer);
    this.bouncer = setTimeout(() => {
      this.getIndices(event.target.value);
    }, 400); 
  }

  getIndices(query: string) {
    this.loading = true;
    this.indiceCorrecaoService.pesquisarIndices({
      page: 0,
      size: 20,
      sort: 'nome',
      direction: 'desc',
      status: 'ATIVO',
      nome: query
    }).subscribe({
      next: (data) => {
        this.loading = false;
        if(data.content.length > 0) {
          this.indices = data.content;
          if(this.form.touched) {
            this.search = true;
          }
        }else {
          this.indices = [];
        }
      }
    })
  }

  get processos() {
    return this.form.get('processos') as FormArray;
  }

  getProcessoForm(index: number): FormGroup {
    return this.processos.at(index) as FormGroup;
  }
  
  public AddCampos() {
    this.formService.adicionarProcesso();
  }

  public removeCampo(index: any) {
    this.formService.removerProcesso(index);
  }
  public deleteProcesso(i: number) {
    const modal = this.modalService.open(ConfirmationDialogComponent);
    modal.componentInstance.title = 'Deseja excluir o processo?'
    modal.componentInstance.body = 'Essa operação é irreversível.'
    modal.closed.subscribe((data) => {
      if(data) {
        const itemProcesso = this.processos.at(i);
        this.dadosBasicosService.removerProcesso(itemProcesso.value.idProcesso).subscribe({
          next: (response) => {
            this.toastr.success('Processo removido com sucesso.')
            this.formService.removerProcesso(i);
          },
          error: () => {
            this.toastr.error('Erro ao remover o processo.')
          }
        });
      }
    })
  }

  public pesquisarFornecedor() {
    const modal = this.modalService.open(ModalFornecedoresComponent, {
      size: 'lg'
    });
    modal.closed.subscribe({
      next: (data) => {
        if(data) this.form.patchValue({
          razaoSocialFornecedor: data.razaoSocial,
          cpfCnpj: data.cpfCnpj
        });
        this.form.get('razaoSocialFornecedor')?.markAsTouched();
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error);
      },
      complete: () => {
      }
    })
  }

  public getFundamentos() {
    this.contratosService.getFundamentos('DISPENSA').subscribe({
      next: (data: any) => {
        this.fundamentos = data.data;
      },
      error: (err) => {
        this.toastr.error(err);
      },
      complete: () => {
        
      }
    })
  }

  public getFundamentosIn() {
    this.contratosService.getFundamentos('INEXIGIBILIDADE').subscribe({
      next: (data: any) => {
        this.fundamentosIn = data.data;
      },
      error: (err) => {
        this.toastr.error(err);
      },
      complete: () => {
        
      }
    })
  }

  public openFundamentos() {
    const modal = this.modalService.open(ModalSelectComponent, {
      centered: true,
      size: 'lg'
    });
    modal.componentInstance.options = this.form.value.modalidadeLicitacao === 'DISPENSA' ? this.fundamentos : this.fundamentosIn;
    modal.componentInstance.title = this.form.value.modalidadeLicitacao === 'DISPENSA' ? "Fundamentos 'Dispensa'" : "Fundamentos 'Inexigibilidade'"
    modal.closed.subscribe({
      next: (data: any) => {
        if(data) {
          this.form.patchValue({
            fundamentoLicitacao: data
          });
          console.log(this.form.value);
        }
      }
    })
  }

  public salvar() {
    if(this.form.valid) {
      if(!this.form.value.numeroContrato && !this.formService.processos.value[0].numeroProcesso) {
        this.toastr.error(' O número de processo e o número de contrato não podem estar em branco ao mesmo tempo.');
        return
      }     
      if((this.form.value.modalidadeLicitacao === 'DISPENSA' ||
      this.form.value.modalidadeLicitacao === 'INEXIGIBILIDADE') &&
      !this.form.value.fundamentoLicitacao) {
        this.toastr.error('O campo Fundamento é obrigatório para o tipo de Modalidade!');
        return
      }
      if (!this.form.value.idContrato) { 
        let data = this.form.value;
        delete data.idContrato;
        this.dadosBasicosService.salvarDadosBasicos(data)
        .subscribe({
          next: (response) => {
            if(response) {
              this.toastr.success('Dados básicos cadastrados com sucesso!');
              this.form.patchValue({idContrato: response.id});
              this.formService.progress['dadosbasicos'] = true;
              this.formService.getContratoById(response.id);
              this.router.navigate(['/home/contrato/datas-prazos/', response.id]);
            }
          },
          error: (err) => {
            this.toastr.error(err);
          },
        });
    } else {
      const id = this.form.value.idContrato;
      let data = this.form.value;
      delete data.idContrato;
      this.dadosBasicosService.editarDadosBasicos(id, data).subscribe({
        next: (response) => {
          this.toastr.success('Dados básicos atualizados com sucesso!');
          this.router.navigate(['/home/contrato/datas-prazos/', id]);
          dados_basicos = true;
        },
        error: (err) => {
                this.toastr.error(err);
              },
      })
     }
    }else {
      this.toastr.error('Preencha todos os campos obrigatórios.');
      this.utils.markFormGroupTouched(this.form);
      console.log(this.form)
    }
  }
}

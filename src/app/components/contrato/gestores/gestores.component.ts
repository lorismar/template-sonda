import { Component, OnInit } from '@angular/core';
import { GestoresService } from '../../../services/contratos/gestores.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { GestoresModel } from 'src/app/model/gestores-model';
import { AbstractControl, FormArray, FormGroup, NgForm } from '@angular/forms';
import { CadastroContratosService } from 'src/app/services/contratos/cadastro-constratos.service';
import { faUserTie, faUserGear, faUserShield, faUserClock } from '@fortawesome/free-solid-svg-icons';
import { UtilsService } from 'src/app/services/geral/utils.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';

export let validaGestor = false;

@Component({
  selector: 'app-gestores',
  templateUrl: './gestores.component.html',
  styleUrls: ['./gestores.component.css'],
})
export class GestoresComponent implements OnInit {
  public form: FormGroup;
  public formDadosBasicos: FormGroup;
  public loading: boolean = false;
  public mostrarLista: boolean[] = [];
  public buscaGestor: boolean[] = [];
  public faUserTie = faUserTie;
  public faUserGear = faUserGear;
  public faUserShield = faUserShield;
  public faUserClock = faUserClock;
  searchText: string;
  public validaGestores = new GestoresModel();
  listaGestores: any[] = [];
  selectedGestor: any;
  selectedUnidade: string;
  selectedFiscal: any;
  selectedFiscalAdm: any;
  unidades: any[] = [];
  listaUnidades: any[] = [];
  mostrarListaUnidades = false;
  id: number;
  sigla: string;
  descricao: string;
  idContrato: any;
  areaContratacao: any;
  areaContratacaoSelecionada: any;
  public salvamentoComSucesso = false;
  disableSalvar = true;
  public editandoContrato: any;
  editando: boolean;
  ocultaListaEditar: boolean = false;
  editarGestores: boolean;
  private idContratoViaRota: ActivatedRouteSnapshot;
  validaCampo: boolean;

  public buscaFiscal: boolean;
  public buscaAdm: boolean;
  private bouncerTimer: any;

  constructor(
    private gestoresService: GestoresService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formService: CadastroContratosService,
    private utils: UtilsService,
    private modalService: NgbModal
  ) {
      this.idContrato = activatedRoute.snapshot.params['idContrato'];
  }

  ngOnInit(): void {
    this.form = this.formService.getForm('gestores');
    this.formDadosBasicos = this.formService.getForm('dadosBasicos');
    this.form.get('fiscal')?.valueChanges.subscribe((value) => {
      this.selectedFiscal = value.nome;
    })
    this.form.get('fiscalAdm')?.valueChanges.subscribe((value) => {
      this.selectedFiscalAdm = value.nome;
    })
    this.form.get('gestor')?.valueChanges.subscribe((value) => {
      this.selectedGestor = value.nome;
    })
  }

  get gestores() {
    return this.form.get('gestores') as FormArray;
  }

  getGestoresForm(index: number): FormGroup {
    return this.gestores.at(index) as FormGroup;
  }

  public AddGestor() {
    this.formService.adicionarGestor();
  }

  removerGestor(i: number) {
    const id = this.gestores.controls[i].value.idGestorContrato;
    if(id) {
      const modal = this.modalService.open(ConfirmationDialogComponent);
      modal.componentInstance.title = 'Desvincular Gestor ou Fiscal';
      modal.componentInstance.body = 'Deseja realmente desvincular o Gestor/Fiscal desse contrato?';
      modal.closed.subscribe({
        next: (data) => {
          if(data) {
            this.gestoresService.deleteGestor(id).subscribe({
              next: (data) => {
                this.toastr.success('Gestor desvinculado com sucesso.');
                this.formService.removerGestor(i);
              },
              error: (err) => {
                this.toastr.error(err)
              },
              complete: () => {
              }
            });
          }
        }
      });
    } else {
      this.formService.removerGestor(i);
      this.toastr.success('Gestor desvinculado com sucesso.');
    }
  }

  callBuscarGestores(event: any, index: number): void {
    clearTimeout(this.bouncerTimer);
    this.bouncerTimer = setTimeout(() => {
      this.buscarGestores(event, index);
    }, 400); 
  }

  buscarGestores(event: any, index: number): void {
    const nome = event.target.value;
    if (nome.length >= 3 && !this.buscaGestor[index]) {
      this.buscaGestor[index] = true;
      let aux = [];
      this.gestoresService.getGestores(nome)
      .subscribe((data: any[]) => {
        this.mostrarLista[index] = true;
        this.buscaGestor[index] = false;
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

  selecionarGestor(gestor: any, targetForm: AbstractControl, index: number): void {
    targetForm.patchValue({
      nome: gestor.nome,
      gestor: gestor
    });

    this.mostrarLista[index] = false;
    this.listaGestores = [];
  }

  callBuscarUnidades(event: any): void {
    clearTimeout(this.bouncerTimer);
    this.bouncerTimer = setTimeout(() => {
      this.buscarUnidades(event.target.value);
    }, 400);
  }
  
  buscarUnidades(event: any): void {
    this.loading = true;
    this.gestoresService.getUnidades(event).subscribe({
      next: (data: any[]) => {
      this.mostrarListaUnidades = true;
      this.unidades = data.map((unidade) => unidade.descricao);
      this.unidades = this.unidades.sort();
      this.listaUnidades = this.unidades.sort();
      this.loading = false;
    },
    error: (err: any) => {
      this.toastr.error('Erro no Serviço de Unidades do EGESP.')
      console.log(err)
    },
    complete: () => {
      this.loading = false;
    }
    });
  }

  selecionarUnidade(unidade: string): void {
    this.form.patchValue({unidade: unidade});
    this.mostrarListaUnidades = false;
  }

  onChangeAreaContratacao(event: Event) {
    const target = event.target as HTMLInputElement;
    this.areaContratacaoSelecionada = target.value;
    console.log(this.areaContratacaoSelecionada);
  }

  salvar() {
    if(this.formDadosBasicos.value.idContrato){
      if(this.form.valid) {
        const dados = {
          idContrato: this.formDadosBasicos.value.idContrato,
          areaContratacao: this.form.value.areaContratacao,
          unidadeSolicitante: this.form.value.unidade,
          gestores: this.form.value.gestores.map((gestorForm: any) => {
            return {
              nome: gestorForm.gestor.nome,
              cpf: gestorForm.gestor.cpf,
              matricula: gestorForm.gestor.matricula,
              funcao:
                gestorForm.gestor.funcao
                  ? gestorForm.gestor.funcao
                  : gestorForm.gestor.especialidade,
              email: gestorForm.gestor.email,
              tipoGestor: gestorForm.tipoGestor,
              unidadeLocacao: gestorForm.gestor.unidadeLocacao ? gestorForm.gestor.unidadeLocacao : gestorForm.gestor.lotacao,
              idComarca: gestorForm.gestor.idComarca
            }
        })
        };

        if(this.formService.progress['gestores']) {
          this.gestoresService.putEditarGestores(dados).subscribe({
            next: (response) => { 
              this.toastr.success('Gestores e Fiscais editados com sucesso!');
              this.formService.gestores.clear();
              this.formService.getDadosGestores();
              this.router.navigate(['/home/contrato/quadro-demonstrativo/' + this.idContrato]);
            },
            error: (err) => {
                    console.log(err);
                    this.toastr.error(err);
                  },
          });
          return
        }
        this.gestoresService.cadastrarGestoresContrato(dados).subscribe({
          next: (dados: any) => {
            this.salvamentoComSucesso = true;
            validaGestor = true;
            this.toastr.success('Gestores e Fiscais cadastrados com sucesso!');
            this.formService.gestores.clear();
            this.formService.getDadosGestores();
            this.formService.progress['gestores'] = true;
            this.router.navigate(['/home/contrato/quadro-demonstrativo/' + this.idContrato]);
          },
          error: (error) => {
            console.log(error);
            this.salvamentoComSucesso = false;
            this.toastr.error('Erro ao cadastrar Gestores e Fiscais');
          },
        });

      }else {
        console.log(this.form);
        this.toastr.error('Preencha os campos obrigatorios.');
        this.form.markAllAsTouched();
      }
    } else {
      console.log(this.form.value);
    }
  }
  
}

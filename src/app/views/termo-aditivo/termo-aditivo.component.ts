import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { TermoAditivoService } from 'src/app/services/termo-aditivo/termo-aditivo.service';
import { ModalContratoComponent } from 'src/app/components/termo-aditivo/modal-contrato/modal-contrato.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UtilsService } from 'src/app/services/geral/utils.service';
import { faRepeat, faPlus, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { ModalRazaoSocialComponent } from 'src/app/components/termo-aditivo/modal-razao-social/modal-razao-social.component';
import { ToastrService } from 'ngx-toastr';
import { ContratosService } from 'src/app/services/contratos/lista-contratos.service';
import { DadosBasicosService } from 'src/app/services/contratos/dados-basicos.service';
import { ConfirmationDialogComponent } from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.component';
import { ModalValorContratualComponent } from 'src/app/components/termo-aditivo/modal-valor-contratual/modal-valor-contratual.component';
import { ModalOutrosComponent } from 'src/app/components/termo-aditivo/modal-outros/modal-outros.component';
import { ModalSuspensaoComponent } from 'src/app/components/termo-aditivo/modal-suspensao/modal-suspensao.component';
import { ModalPrazoVigenciaComponent } from 'src/app/components/termo-aditivo/modal-prazo-vigencia/modal-prazo-vigencia.component';
import { ModalReajusteComponent } from 'src/app/components/termo-aditivo/modal-reajuste/modal-reajuste.component';
import { ModalQuadroDemonstrativoComponent } from 'src/app/components/termo-aditivo/modal-quadro-demonstrativo/modal-quadro-demonstrativo.component';
import { ModalQuadroSupressaoComponent } from 'src/app/components/termo-aditivo/modal-quadro-supressao/modal-quadro-supressao.component';
import { ModalReequilibrioComponent } from 'src/app/components/termo-aditivo/modal-reequilibrio/modal-reequilibrio.component';
import { ModalLinkArquivoComponent } from 'src/app/shared/components/modal-link-arquivo/modal-link-arquivo.component';
declare var window: any;
@Component({
  selector: 'app-termo-aditivo',
  templateUrl: './termo-aditivo.component.html',
  styleUrls: ['./termo-aditivo.component.scss']
})
export class TermoAditivoComponent implements OnInit {
  public faPenToSquare = faPenToSquare;
  public faTrash = faTrash;
  public faRepeat = faRepeat;
  public faPlus = faPlus;
  public modal: NgbModalRef
  public idTermoAditivo: string;
  public step: number = 0;
  public form: FormGroup;
  public loading: boolean = false;
  public search: boolean = false;
  public situacao: string;
  public labelMotivos: any = {
    ALTERACAO_RAZAO_SOCIAL: 'Alteração de Razão Social',
    ACRESCIMO: 'Acréscimo',
    MODIFICACAO_VALOR_CONTRATUAL: 'Modificação do Valor Contratual',
    OUTROS: 'Outros',
    PRORROGACAO_VIGENCIA: 'Prorrogação de Vigência',
    REAJUSTE: 'Reajuste',
    REEQUILIBRIO: 'Reequilíbrio',
    REPACTUACAO: 'Repactuação',
    SUPRESSAO: 'Supressão',
    SUSPENSAO: 'Suspensão',
  }
  public motivoOptions: string[] = Object.keys(this.labelMotivos);

  constructor(
    private router: Router,
    private fb: FormBuilder, 
    private activatedRoute: ActivatedRoute,
    public termoAditivoService: TermoAditivoService,
    private modalService: NgbModal,
    private utils: UtilsService,
    private toastr: ToastrService,
    private contratoService: DadosBasicosService) { 
    // this.idTermoAditivo = this.utils.extractId(this.router.url);
    this.idTermoAditivo = this.activatedRoute.snapshot.params['idTermoAditivo'];
    this.form = this.fb.group({
      idContrato: [null],
      idTermoAditivo: [null],
      numeroContrato: [null],
      numero: [null],
      valorContrato: [null],
      ano: [null, Validators.required],
      codigoUnidadeOrcamentaria: [null, Validators.required],
      dataAssinatura: [null, Validators.required],
      dataPublicacao: [null, Validators.required],
      localPublicacao: [null, Validators.required],
      linkPublicacao: [null],
      numeroProcessoSei: [null, Validators.required],
      anoProcessoSei: [null, Validators.required],
      motivos: this.fb.array([], Validators.required)
    })
  }

  extractNovo(url: string): string {
    const padrao = /\/(\w+)$/;
    const resultado = url.match(padrao);
    if (resultado) {
      return resultado[1];
    } else {
      return '';
    }
  }
  checkForm() {
    this.idTermoAditivo = this.utils.extractId(this.router.url);
    const novo = this.extractNovo(this.router.url);
    if(!this.idTermoAditivo && novo) {
      location.reload();
  }}

  ngOnInit(): void {
    
    if(this.termoAditivoService.contrato) {
      const data = this.termoAditivoService.contrato
      this.form.patchValue({
        idContrato: data.idContrato,
        numeroContrato: data.numeroContrato,
        valorContrato: data.valorTotal,
      })
      this.getInfo(data.idContrato);
    }else if(this.idTermoAditivo && this.idTermoAditivo != 'novo') {
      this.termoAditivoService.getTermoAditivo(this.idTermoAditivo).subscribe({
        next: (data: any) => {
          this.contratoService.getByIdContrato(data.idContrato).subscribe({
            next: (data) => {
              this.termoAditivoService.contrato = data;
            }
          })

          if(data.status === 'FINALIZADO') {
            this.situacao = 'Finalizado';
          } else {
            this.situacao = 'Em Aberto';
          }
          this.getInfo(data.idContrato);
          this.form.patchValue(data);
          data.motivos.forEach((motivo: any, index: number) => {
            if(motivo.motivoAditivacao == 'ALTERACAO_RAZAO_SOCIAL'){
                motivo.fornecedor = data;
                this.adicionarRazaoSocial(motivo);
            }else if(motivo.motivoAditivacao == 'MODIFICACAO_VALOR_CONTRATUAL') {
                this.adicionarValorContratual(motivo);
            }else if(motivo.motivoAditivacao == 'OUTROS') {
              this.adicionarOutros(motivo);
            }else if(motivo.motivoAditivacao == 'SUSPENSAO') {
              this.adicionarSuspensao(motivo);
            }else if(motivo.motivoAditivacao == 'PRORROGACAO_VIGENCIA') {
              this.adicionarPrazoVigencia(motivo);
            }else if(motivo.motivoAditivacao == 'REAJUSTE'){
              this.adicionarReajuste(motivo);
            }else if(motivo.motivoAditivacao == 'REEQUILIBRIO'){
              this.adicionarReequilibrio(motivo);
            }else if(motivo.motivoAditivacao == 'ACRESCIMO'){ 
              this.adicionarAcressimo(motivo);
            }else if(motivo.motivoAditivacao == 'SUPRESSAO'){ 
              this.adicionarSupressao(motivo);
            }
          })
          this.utils.logInvalidControls(this.form);
        }
      })
    }else {
      this.abrirModal();
    }
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.checkForm();
      }
    });
  }

  abrirModal() {
    this.modal = this.modalService.open(ModalContratoComponent, {
      backdrop: 'static',
      keyboard: false
    });
    this.modal.closed.subscribe({
      next: (data) => {
        this.termoAditivoService.contrato = data;
        this.form.patchValue({
          idContrato: data.idContrato,
          numeroContrato: data.numeroContrato,
          valorContrato: data.valorTotal,
        })
        this.getInfo(data.idContrato);
      }
    })
  }

  fecharModal() {
    this.modal.close();
  }

  getInfo(idContrato: any) {
    this.contratoService.getInfoContrato(idContrato).subscribe({
      next: (data) => {
        console.log(data)
        this.termoAditivoService.info = data;
      }
    })
  }

  finalizar() {
    const modal = this.modalService.open(ModalLinkArquivoComponent);
      modal.closed.subscribe({
        next: (data) => {
          if(data) {
            if(!this.form.value.numero) {
              this.toastr.error('O campo número do termo aditivo não pode estar em branco');
              return;
            }
            if(this.form.value.motivos.length === 0) {
              this.toastr.error('Deve haver pelo menos 1 motivos cadastrado no termo aditivo');
              return;
            }
            data.idTermoAditivo = this.idTermoAditivo
            this.termoAditivoService.finalizar(data).subscribe({
              next: (data) => {
                this.toastr.success('Termo Aditivo Finalizado com Sucesso');
                this.router.navigate(['/home']);
              },
              error: (err) => {
                console.error(err);
                this.toastr.error(err);
                this.loading = false;
              },
              complete: () => {
                this.loading = false;
              }
            })
          }
        }
      })
  }

  salvar() {
    if(this.form.valid) {
      if(!this.form.value.idTermoAditivo){
        this.termoAditivoService.salvarTermoAditivo(this.form.value).subscribe({
          next: (data: any) => {
            this.toastr.success('Termo Aditivo cadastrado com sucesso!');
            setTimeout(() => {
              this.router.navigate(['/home/termo-aditivo/', data.id]).then(() => {
                location.reload()       
              });
            }, 500)
     
          },
          error: (err) => {
            this.toastr.error(err);
            this.loading = false;
          },
          complete: () => {
            this.loading = false;
          }
        })
      }else {
        this.termoAditivoService.editarTermoAditivo(this.form.value, this.form.value.idTermoAditivo).subscribe({
          next: (data) => {
            this.toastr.success('Termo Aditivo editado com sucesso!');
            setTimeout(() => {
              location.reload()       
            }, 500)     
          },
          error: (err) => {
            this.toastr.error(err);
            this.loading = false;
          },
          complete: () => {
            this.loading = false;
          }
        })
      }
    }else {
      console.log(this.form.value);
    }
  }

  openAdicionar(){
    this.search = !this.search;
  }

  get motivos() {
    return this.form.get('motivos') as FormArray;
  }

  openValorContratual(data?: any, index?: number) {
    const modal = this.modalService.open(ModalValorContratualComponent, {
      centered: true
    });
    if(data) modal.componentInstance.data = data;
    modal.componentInstance.contrato = this.termoAditivoService.contrato;
    modal.closed.subscribe({
      next: (result) => {
        if(result) {
          if(data && index?.toString()){
            console.log(result)
            this.motivos.controls[index].get('acaoTrocaValor')?.patchValue({
              valorTermoAditivo: result.valorTermoAditivo,
              percentualAjustado: result.percentualAjustado,
              valorContratoAtualizado: result.valorContratoAtualizado
            })
          }else{
            this.adicionarValorContratual(result);
          }
        }
      }
    })
  }

  adicionarValorContratual(result?: any) {
    const motivo = this.fb.group({
      idAcaoTermoAditivo: [],
      motivoAditivacao: ["MODIFICACAO_VALOR_CONTRATUAL", Validators.required],
      acaoTrocaValor: this.fb.group({
        valorTermoAditivo: ['', Validators.required],
        percentualAjustado: ['', Validators.required],
        valorContratoAtualizado: ['', Validators.required]
      })
    })
    if(result){ 
      motivo.patchValue(result)
      motivo.get('acaoTrocaValor')?.patchValue(result);
    }
    this.motivos.push(motivo);
    this.motivoOptions.splice(this.motivoOptions.indexOf('MODIFICACAO_VALOR_CONTRATUAL'), 1)
  }

  adicionarRazaoSocial(result?: any) {
    console.log(result)
    const motivo = this.fb.group({
      idAcaoTermoAditivo: [],
      motivoAditivacao: ["ALTERACAO_RAZAO_SOCIAL", Validators.required],
      acaoTrocaFornecedor: this.fb.group({
        razaoSocialFornecedor: ['', Validators.required],
        cpfCnpj: ['', Validators.required],
        nomeUltimoFornecedor: ['']
      }),
      fornecedor: this.fb.group({
        razaoSocialFornecedor: [],
        cpfCnpj: []
      })
    });
    if(result){ 
      motivo.patchValue(result)
      if(result.razaoSocial || result.acaoTrocaFornecedor){
        motivo.get('acaoTrocaFornecedor')?.patchValue({
          razaoSocialFornecedor: result.razaoSocial ? result.razaoSocial : result.acaoTrocaFornecedor.razaoSocialFornecedor,
          cpfCnpj: result.cpfCnpj ?  result.cpfCnpj : result.acaoTrocaFornecedor.cpfCnpj,
          nomeUltimoFornecedor: result?.acaoTrocaFornecedor?.nomeUltimoFornecedor ? result.acaoTrocaFornecedor.nomeUltimoFornecedor : result.fornecedor.razaoSocialFornecedor
        })
      }
      if(result.fornecedor) motivo.get('fornecedor')?.patchValue(result.fornecedor)
    };
    this.motivos.push(motivo);
    this.motivoOptions.splice(this.motivoOptions.indexOf('ALTERACAO_RAZAO_SOCIAL'), 1)
  }

  openRazaoSocial(data?: any, index?: number) {
    const modal = this.modalService.open(ModalRazaoSocialComponent, {
      centered: true
    });
    if(data) modal.componentInstance.data = data;
    modal.componentInstance.contrato = this.termoAditivoService.contrato;
    modal.closed.subscribe({
      next: (result) => {
        if(result) {
          if(data && index?.toString()){
            if(result.razaoSocial){
              this.motivos.controls[index].get('acaoTrocaFornecedor')?.patchValue({
                razaoSocialFornecedor: result.razaoSocial,
                cpfCnpj: result.cpfCnpj})
            }
          }else{
            this.adicionarRazaoSocial(result);
          }
        }
      }
    })
  }

  adicionarOutros(result?: any) {
    const motivo = this.fb.group({
      idAcaoTermoAditivo: [],
      motivoAditivacao: ["OUTROS", Validators.required],
      acaoOutros: this.fb.group({
        outros: ['', Validators.required]
      })
    });
    if(result){ 
      if(result.idAcaoTermoAditivo) {
        motivo.patchValue(result)
      }else {
        motivo.get('acaoOutros')?.patchValue({
          outros: result
        })
      }
    };
    this.motivos.push(motivo);
    this.motivoOptions.splice(this.motivoOptions.indexOf('OUTROS'), 1)
  }

  openOutros(data?: any, index?: number) {
    const modal = this.modalService.open(ModalOutrosComponent, {
      centered: true
    });
    if(data) modal.componentInstance.data = data;
    modal.closed.subscribe({
      next: (result) => {
        if(result) {
          if(data && index?.toString()){
              this.motivos.controls[index].get('acaoOutros')?.patchValue({
                outros: result
            })
          }else{
            this.adicionarOutros(result);
          }
        }
      }
    })
  }

  adicionarPrazoVigencia(result?: any) {
    const motivo = this.fb.group({
      idAcaoTermoAditivo: [],
      motivoAditivacao: ["PRORROGACAO_VIGENCIA", Validators.required],
      acaoPrazo: this.fb.group({
        novoPrazoVigencia: ['', Validators.required],
        tipoPrazoVigencia: ['', Validators.required],
        novaDataVigencia: ['', Validators.required]
      })
    })
    if(result){ 
      motivo.patchValue(result)
      motivo.get('acaoPrazo')?.patchValue(result);
    }
    this.motivos.push(motivo);
    this.motivoOptions.splice(this.motivoOptions.indexOf('PRORROGACAO_VIGENCIA'), 1)
  }

  openPrazoVigencia(data?: any, index?: number) {
    const modal = this.modalService.open(ModalPrazoVigenciaComponent, {
      centered: true
    });
    if(data) modal.componentInstance.data = data;
    modal.componentInstance.contrato = this.termoAditivoService.contrato;
    modal.componentInstance.info = this.termoAditivoService.info;
    modal.closed.subscribe({
      next: (result) => {
        if(result) {
          if(data && index?.toString()){
            this.motivos.controls[index].get('acaoPrazo')?.patchValue({
              novoPrazoVigencia: result.novoPrazoVigencia,
              tipoPrazoVigencia: result.tipoPrazoVigencia,
              novaDataVigencia: result.novaDataVigencia
          })
        }else{
          this.adicionarPrazoVigencia(result)
        }
        }
      }
    })
  }


  adicionarSuspensao(result?: any) {
    const motivo = this.fb.group({
      idAcaoTermoAditivo: [],
      motivoAditivacao: ["SUSPENSAO", Validators.required],
      acaoSuspensao: this.fb.group({
        tipoSuspensao: ['', Validators.required],
        dataSuspensao: ['', Validators.required]
      })
    })
    if(result){ 
      motivo.patchValue(result)
      motivo.get('acaoSuspensao')?.patchValue(result);
    }
    this.motivos.push(motivo);
    this.motivoOptions.splice(this.motivoOptions.indexOf('SUSPENSAO'), 1)
  }

  openSuspensao(data?: any, index?: number) {
    const modal = this.modalService.open(ModalSuspensaoComponent, {
      centered: true
    });
    if(data) modal.componentInstance.data = data;
    modal.componentInstance.contrato = this.termoAditivoService.contrato;
    modal.componentInstance.info = this.termoAditivoService.info;
    modal.closed.subscribe({
      next: (result) => {
        if(result) {
          if(data && index?.toString()){
            this.motivos.controls[index].get('acaoSuspensao')?.patchValue({
              tipoSuspensao: result.tipoSuspensao,
              dataSuspensao: result.dataSuspensao
          })
          }else{
            this.adicionarSuspensao(result);
          }
        }
      }
    })
  }

  adicionarReajuste(result?: any) {
    const motivo = this.fb.group({
      idAcaoTermoAditivo: [],
      motivoAditivacao: ["REAJUSTE", Validators.required],
      acaoReajuste: this.fb.group({
        idAcaoTermoAditivo: [],
        houveNegociacao: ['', Validators.required],
        percentualNegociado: [''],
        valorNegociado: [''],
        valorContratoNegociado: [''],
        percentualCorrecao: ['', Validators.required],
        valorTermoAditivo: ['', Validators.required],
        valorContratoAtualizado: ['', Validators.required],
        itensReajuste: this.fb.array([])
      })
    })
    if(result){ 
      motivo.patchValue(result)
      const acaoReajuste = motivo.get('acaoReajuste');
      acaoReajuste?.patchValue(result);
      const itens = result.itensReajuste ? result.itensReajuste : result.acaoReajuste.itensReajuste;
      itens.forEach((item: any) => {
        const itemReajuste = this.fb.group({
          idItemAcaoReajuste: [],
          idItemQuadroDemos: [],
          percentualCorrecao: [],
          valorCorrecao: []
        })
        itemReajuste.patchValue(item);
        const itensReajuste = acaoReajuste?.get('itensReajuste') as FormArray
        itensReajuste.push(itemReajuste);
      })
    }
    this.motivos.push(motivo);
    this.motivoOptions.splice(this.motivoOptions.indexOf('REAJUSTE'), 1)
  }

  openReajuste(data?: any, index?: number) {
    const modal = this.modalService.open(ModalReajusteComponent, {
      centered: true,
      size: 'xl'
    });
    if(data) modal.componentInstance.data = data;
    modal.componentInstance.contrato = this.termoAditivoService.contrato;
    modal.componentInstance.info = this.termoAditivoService.info;
    modal.closed.subscribe({
      next: (result) => {
        if(result) {
          if(data && index?.toString()){
            this.motivos.removeAt(index);
            this.adicionarReajuste(result)
            // this.motivos.controls[index].get('acaoReajuste')?.patchValue(result)
          }else{
            this.adicionarReajuste(result)
          }
        }
      }
    })
  }

  openReequilibrio(data?: any, index?: number) {
    const modal = this.modalService.open(ModalReequilibrioComponent, {
      centered: true,
      size: 'xl'
    });
    if(data) modal.componentInstance.data = data;
    modal.componentInstance.contrato = this.termoAditivoService.contrato;
    modal.componentInstance.info = this.termoAditivoService.info;
    modal.closed.subscribe({
      next: (result) => {
        if(result) {
          if(data && index?.toString()){
            this.motivos.removeAt(index);
            this.adicionarReequilibrio(result)
            this.motivos.controls[index].get('acaoReajuste')?.patchValue(result)
          }else{
            this.adicionarReequilibrio(result)
          }
        }
      }
    })
  }

  adicionarReequilibrio(result?: any) {
    const motivo = this.fb.group({
      idAcaoTermoAditivo: [],
      motivoAditivacao: ["REEQUILIBRIO", Validators.required],
      acaoReequilibrio: this.fb.group({
        idAcaoTermoAditivo: [],
        percentualCorrecao: ['', Validators.required],
        valorTermoAditivo: ['', Validators.required],
        valorContratoAtualizado: ['', Validators.required],
        itensReequilibrio: this.fb.array([])
      })
    })
    if(result){ 
      motivo.patchValue(result)
      const acaoReequilibrio = motivo.get('acaoReequilibrio');
      acaoReequilibrio?.patchValue(result);
      const itens = result.itensReequilibrio ? result.itensReequilibrio : result.acaoReequilibrio.itensReequilibrio;
      itens.forEach((item: any) => {
        const itemReajuste = this.fb.group({
          idItemAcaoReequilibrio: [],
          idItemQuadroDemos: [],
          percentualCorrecao: [],
          valorCorrecao: []
        })
        itemReajuste.patchValue(item);
        const itensReequilibrio = acaoReequilibrio?.get('itensReequilibrio') as FormArray
        itensReequilibrio.push(itemReajuste);
      })
    }
    this.motivos.push(motivo);
    this.motivoOptions.splice(this.motivoOptions.indexOf('REEQUILIBRIO'), 1)
  }

  adicionarAcressimo(result?: any) {
    const motivo = this.fb.group({
      idAcaoTermoAditivo: [],
      motivoAditivacao: ["ACRESCIMO", Validators.required],
      acaoAlteracaoItemValor: this.fb.group({
        valorTermoAditivo: ['', Validators.required],
        percentualAjustado: ['', Validators.required],
        valorContratoAtualizado: ['', Validators.required],
        itensQuadro: [[], Validators.required],
      })
    })
    if(result){ 
      motivo.patchValue(result)
      motivo.get('acaoAlteracaoItemValor')?.patchValue(result);
    }
    this.motivos.push(motivo);
    this.motivoOptions.splice(this.motivoOptions.indexOf('ACRESCIMO'), 1)
  }

  
  openQuadroDemonstrativo(data?: any, index?: number) {
    const modal = this.modalService.open(ModalQuadroDemonstrativoComponent, {
      centered: true,
      size: 'xl'
    });
    if(data) modal.componentInstance.data = data;
    modal.componentInstance.contrato = this.termoAditivoService.contrato;
    modal.componentInstance.info = this.termoAditivoService.info;
    modal.closed.subscribe({
      next: (result) => {
        if(data && index?.toString()){
          this.motivos.controls[index].get('acaoAlteracaoItemValor')?.patchValue(result) 
        }else if(result) {
          this.adicionarAcressimo(result)
        }
      }
    })
  }

  adicionarSupressao(result?: any) {
    const motivo = this.fb.group({
      idAcaoTermoAditivo: [],
      motivoAditivacao: ["SUPRESSAO", Validators.required],
      acaoAlteracaoItemValor: this.fb.group({
        valorTermoAditivo: ['', Validators.required],
        percentualAjustado: ['', Validators.required],
        valorContratoAtualizado: ['', Validators.required],
        itensQuadro: [[], Validators.required],
      })
    })
    if(result){ 
      motivo.patchValue(result)
      motivo.get('acaoAlteracaoItemValor')?.patchValue(result);
    }
    this.motivos.push(motivo);
    this.motivoOptions.splice(this.motivoOptions.indexOf('SUPRESSAO'), 1)
  }

  
  openSupressao(data?: any, index?: number) {
    const modal = this.modalService.open(ModalQuadroSupressaoComponent, {
      centered: true,
      size: 'xl'
    });
    if(data) modal.componentInstance.data = data;
    modal.componentInstance.contrato = this.termoAditivoService.contrato;
    modal.componentInstance.info = this.termoAditivoService.info;
    modal.closed.subscribe({
      next: (result) => {
        if(result) {
        if(data && index?.toString()){
          this.motivos.controls[index].get('acaoAlteracaoItemValor')?.patchValue(result) 
        }else if(result) {
          this.adicionarSupressao(result)
        }
        }
      }
    })
  }


  selecionarMotivo(motivo: string, data?: any, index?: number){
    this.search = false;
    switch(motivo) {
      case 'ALTERACAO_RAZAO_SOCIAL':
        this.openRazaoSocial(data, index);
        break;
      case 'MODIFICACAO_VALOR_CONTRATUAL':
        this.openValorContratual(data, index);
        break;
      case 'ACRESCIMO':
        this.openQuadroDemonstrativo(data, index);
        break;
      // case 'prorrogacaoDeExecucao':
      //   this.openProrrogacaoDeExecucao();
      //   break;
      case 'PRORROGACAO_VIGENCIA':
        this.openPrazoVigencia(data, index);
        break;
      case 'REAJUSTE':
        this.openReajuste(data, index);
        break;
      case 'REEQUILIBRIO':
        this.openReequilibrio(data, index);
        break;
      case 'REPACTUACAO':
        // this.openReajuste(data, index);
        break;
      case 'SUPRESSAO':
        this.openSupressao(data, index);
        break;
      case 'SUSPENSAO':
        this.openSuspensao(data, index);
        break;
      case 'OUTROS':
        this.openOutros(data, index);
        break;
      default:
        break;
    }
  }
  
  deleteItem(index: number){
    const value = this.motivos.controls[index].value
    if(value.idAcaoTermoAditivo){
      const modal = this.modalService.open(ConfirmationDialogComponent);
      modal.componentInstance.title = 'Excluir Item do Termo Aditivo';
      modal.componentInstance.body = 'Deseja realmente excluir o item desse Termo Aditivo?'
      modal.closed.subscribe({
        next: (confirm) => {
          if(confirm) {
            this.termoAditivoService.removerItem(value.idAcaoTermoAditivo).subscribe({
              next: (data) => {
                this.toastr.success('Item removido com sucesso!');
                this.motivos.removeAt(index);
                this.checkOption();
              },
              error: (err) => {
                console.error(err);
                this.toastr.error(err);
                this.loading = false;
              },
              complete: () => {
                this.loading = false;
              }
            })
          }
        }
      })

    }else {
      this.motivos.removeAt(index);
      this.checkOption();
    }
  }

  checkOption() {
    this. motivoOptions = Object.keys(this.labelMotivos);
    this.motivos.controls.forEach(motivo => {
      const index = this.motivoOptions.indexOf(motivo.get('motivoAditivacao')?.value)
      if(index >= 0) {
        this.motivoOptions.splice(index, 1)
      }
    })
  }


}

import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DadosBasicosModel } from 'src/app/model/dadosBasicos-model';
import { DadosBasicosService } from './dados-basicos.service';
import { DatasPrazosService } from './datas-prazos.service';
import { GestoresService } from './gestores.service';
import { QuadroDemonstrativoService } from './quadro-demonstrativo.service';
import { GarantiasService } from './garantias.service';
import { ActivatedRoute } from '@angular/router';
import { CadastroEmpenhoService } from './cadastro-empenho.service';
import { ArquivosService } from './arquivos.service';
import { UtilsService } from '../geral/utils.service';

@Injectable({
  providedIn: 'root'
})
export class CadastroContratosService {
  private dadosBasicosForm: FormGroup;
  private empenhoForm: FormGroup;
  private datasPrazosForm: FormGroup;
  private garantiasForm: FormGroup;
  private gestoresForm: FormGroup;
  private listaContratosForm: FormGroup;
  public listaQuadroDemonstrativo: any[] = [];
  public listaEmpenhosPorContrato: any[] = [];
  public listaArquivos: any[] = [];
  public progress: {[key: string]: boolean;};
  public path: any;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private dadosBasicosService: DadosBasicosService,
    private datasPrazosService: DatasPrazosService,
    private gestoresService: GestoresService,
    private quadroDemonstrativoService: QuadroDemonstrativoService,
    private garantiasService: GarantiasService,
    private cadastroEmpenhoService: CadastroEmpenhoService,
    private arquivosService: ArquivosService,
    private utilsService: UtilsService) {

      
    this.path = this.activatedRoute.snapshot.params['idContrato'];
    this.dadosBasicosForm = this.fb.group({
        idContrato: [null],
        processos: this.fb.array([]),
        modalidadeLicitacao: [null, Validators.required],
        adesaoArp: ['N', Validators.required],
        correcao: ['N', Validators.required],
        tipoContrato: ['SIMPLIFICADO'],
        tipoContratacao: [null, Validators.required],
        numeroContrato: [null],
        razaoSocialFornecedor: [null, Validators.required],
        cpfCnpj: [null, [utilsService.isCpfCnpj, Validators.required]],
        objeto: [null, [Validators.required, Validators.maxLength(4000)]],
        infoComplementar: [null, [Validators.maxLength(4000)]],
        valorTotal: [null],
        mesIndiceCorrecao: [{value: null, disabled: true}, Validators.required],
        indiceCorrecao: [{value: null, disabled: true}, Validators.required],
        idIndiceCorrecao: [{value: null, disabled: true}, Validators.required],
        codigoUnidadeOrcamentaria: [null, Validators.required],
        simplificado: [null],
        contrato: [null],  
        cadastroFinalizado: [null],
        numeroAtaRegistroPrecos: [{value: null, disabled: true}, Validators.required],
        permitirSubContratacao: ['S'],
        dataPublicacaoContrato: [null],
        localPublicacaoContrato: [null],
        numeroInstrumentoConvocatorio: [null],
        anoInstrumentoConvocatorio: [null],
        tipoInstrumentoConvocatorio: ['EDITAL', Validators.required],
        anoContrato: [null, [Validators.required, Validators.max(9999), Validators.min(1)]],
        fundamentoLicitacao: [null]
    });

    this.empenhoForm = this.fb.group({
        idEmpenho: [null],
        numero: [null],
        valor: [0],
        descricaoProjeto: [null],
        modalidade: [null],
        tipo: [null],
        fonte: [null],
        funcionalProgramatica: [null],
        pa: [null],
        elementoDespesa: [null],
        documentoOrigem: [null],
        idContrato: [null]
      });

    this.datasPrazosForm = this.fb.group({
        idDataPrazo: [null],
        dataApresentacaoProposta: [null],
        dataAssinaturaContrato: [null],
        prazoReuniaoAlinhamento: [null],
        prazoEntrega: [null],
        dataLimiteEntrega: [null],
        prazoRecebimentoProvisorio: [null],
        tipoPrazoPagamento: [null],
        periodicidadePrazoPagamento: [null],
        dataLimiteRecebimento: [null],
        recebimentoDefinitivo: [null],
        prazoPagamento: [null],
        dataLimitePagamento: [null],
        continuado: ['S'],
        dataInicioVigencia: [null],
        dataFimVigencia: [null],
        prazoMaximoVigencia: [null],
        tipoPrazoMaximoVigencia: [null],
        prazoVigencia: [null],
        tipoPrazoVigencia: [null],
        dataLimiteProrogacao: [null],
        garantiaContratual: ['S'],
        prazoGarantia: [null],
        tipoPrazoGarantia: [null],
        idContrato: [null]
    });

    this.garantiasForm = this.fb.group({
        idGarantia: [null],
        garantiaContratual: ['S'],
        dataPrazoVigencia: [null],
        modalidadeGarantia: [null],
        prazoGarantia: [null],
        tipoPrazoGarantia: [null],
        percentual: [null],
        valor: [null],
        prazoGarantiaAjustavel: ['S'],
        marcoInicial: [null],
        prazoApresentacaoGarantia: [null],
        dataLimiteApresentacao: [null],
        prazoProrrogacaoApresentacaoGarantia: ['S'],
        quantidadeDiasUteisProrrogacao: [0],
        dataLimiteProrrogacao: [null],
        idContrato: [null],
        dataTerminoVigenciaGarantiaContratual: [null],
        dataVigenciaGarantiaAssistenciaTecnica: [null],
        dataNovoTerminoVigencia: [null]
      });

    this.gestoresForm = this.fb.group({
      gestores: this.fb.array([]),
      areaContratacao: [null, Validators.required],
      unidade: [null, Validators.required]
      });

      this.progress = {
        dadosbasicos: false,
        garantias: false,
        quadroDemonstrativo: false,
        datasPrazos: false,
        empenhos: false,
        gestores: false,
        arquivos: false,
        finalizarContrato: false
      };
      
      this.adicionarProcesso();
      this.adicionarGestor();
  }

  get processos() {
    return this.dadosBasicosForm.get('processos') as FormArray;
  }

  get gestores() {
    return this.gestoresForm.get('gestores') as FormArray;
  }

  adicionarProcesso(data?: any) {
    const novoProcesso = this.fb.group({
      idProcesso: [null],
      anoProcesso: [null],
      numeroProcesso: [null],
    });
    if(data) novoProcesso.patchValue(data);
    this.processos.push(novoProcesso);
  }

  adicionarGestor(data?: any) {
    const novoGestor = this.fb.group({
      idGestorContrato: [null],
      nome: [''],
      tipoGestor: ['', [Validators.required]],
      gestor: [null, Validators.required]
    });
    if(data) novoGestor.patchValue({
      idGestorContrato: data.idGestorContrato,
      nome: data.nome,
      tipoGestor: data.tipoGestor,
      gestor: data
    });
    this.gestores.push(novoGestor);
  }

  removerProcesso(index: number) {
    this.processos.removeAt(index);
  }

  removerGestor(index: number) {
    this.gestores.removeAt(index);
  }

  getForm(formLabel: string): FormGroup {
    switch (formLabel) {
      case 'dadosBasicos':
        return this.dadosBasicosForm;
      case 'empenho':
        return this.empenhoForm;
      case 'datasPrazos':
        return this.datasPrazosForm;
      case 'garantias':
        return this.garantiasForm;
      case 'gestores':
        return this.gestoresForm;
      case 'listaContratos':
        return this.listaContratosForm;
      default:
        return this.dadosBasicosForm; 
    }
  }

  getContratoById(idContrato: any) {
    if (idContrato != 'novo') {
      this.dadosBasicosService.getByIdContrato(idContrato).subscribe((data: any) => {
        this.dadosBasicosForm.patchValue(data);
        this.dadosBasicosForm.patchValue({
          indiceCorrecao: data.nomeIndiceCorrecao
        });
        if (data) {
          console.log(data)
          this.progress['dadosbasicos'] = true;
          if (data.processos.length > 0) {
            this.processos.clear();
            data.processos.forEach((processo: any) => {
              this.adicionarProcesso(processo);
            });
          }
        }
      });

      this.getDataPrazos(idContrato);
      this.getDadosGestores(idContrato);
      this.getByIdGarantia(idContrato);
      this.getAllListaItens(idContrato);
      this.listarEmpenhos(idContrato);
    }
  
    setTimeout(() => {
      if (this.checkForm()) {
        this.progress['finalizarContrato'] = true;
      } else {
        console.log(this.progress);
      }
    }, 500);
  }
  
  getDataPrazos(idContrato: any) {
    this.datasPrazosService.getDataPrazos(idContrato).subscribe({
      next: (data: any) => {
        if (data) {
          this.datasPrazosForm.patchValue(data);
          if (!this.checkNull(data)) {
            this.progress['datasPrazos'] = true;
          }
        }
      },
      error: (data: any) => {
        console.log(data);
      }
    });
  }
  
  getDadosGestores(idContrato?: any) {
    if(!idContrato) idContrato = this.dadosBasicosForm.value.idContrato;
    this.gestoresService.getDadosGestores(idContrato).subscribe({
      next: (data: any) => {
        if (data) {
          this.progress['gestores'] = true;
          this.gestoresForm.patchValue({
            areaContratacao: data.areaContratacao,
            unidade: data.unidadeSolicitante
          });
          this.gestores.clear()
          data.gestores.forEach((gestor: any) => {
            this.adicionarGestor(gestor);
          })
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
  
  getByIdGarantia(idContrato: any) {
    this.garantiasService.getByIdGarantia(idContrato).subscribe({
      next: (data: any) => {
        if (data) {
          this.garantiasForm.patchValue(data);
          if (!this.checkNull(data) || data.garantiaContratual === 'N') {
            this.progress['garantias'] = true;
          }
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
  
  getAllListaItens(idContrato: any) {
    this.quadroDemonstrativoService.getAllListaItens(idContrato).subscribe((data: any) => {
      this.listaQuadroDemonstrativo = data.sort((a: any, b: any) => a.item - b.item);
      if (this.listaQuadroDemonstrativo?.length > 0) {
        this.progress['quadroDemonstrativo'] = true;
      }
    });
  }
  
  listarEmpenhos(idContrato: any) {
    this.cadastroEmpenhoService.listarEmpenhos(idContrato).subscribe((data: any) => {
      if (data && data.length > 0) {
        this.listaEmpenhosPorContrato = data;
        if (data.length > 0) {
          this.progress['empenhos'] = true;
        }
      }
    });
  }
  
  getAllArquivosContrato(idContrato: any) {
    this.arquivosService.getAllArquivosContrato(idContrato).subscribe((e: any) => {
      this.listaArquivos = e;
      if (e.length > 0) {
        this.progress['arquivos'] = true;
      }
    });
  }

  checkForm() {
    if(
      this.progress['dadosbasicos'] &&
      this.progress['garantias'] &&
      this.progress['datasPrazos'] &&
      this.progress['gestores'] &&
      this.progress['quadroDemonstrativo'] &&
      this.progress['empenhos']
    ) {
      return true
    }else return false
  }

  checkNull(obj: any): boolean {
    for (const key in obj) {
      if (obj[key] === null) {
        return true;
      }
    }
    return false;
  }

  resetSetteper() {
    this.progress['dadosbasicos'] = false;
    this.progress['garantias'] = false;
    this.progress['datasPrazos'] = false;
    this.progress['gestores'] = false;
    this.progress['quadroDemonstrativo'] = false;
    this.progress['empenhos'] = false;
    this.progress['arquivos'] = false;
    this.progress['finalizarContrato'] = false;
    
  }
  
  clearForms() {
    this.dadosBasicosForm.reset({
      tipoContrato: 'SIMPLIFICADO',
      permitirSubContratacao: 'S',
      adesaoArp: 'N',
      correcao: 'N'
    })
    this.empenhoForm.reset()
    this.datasPrazosForm.reset({
      continuado: 'S',
      garantiaContratual: 'S'
    })
    this.garantiasForm.reset({
      garantiaContratual: 'S',
      prazoGarantiaAjustavel: 'S',
      prazoProrrogacaoApresentacaoGarantia: 'S'
    })
    this.processos.clear();
    this.adicionarProcesso();
    this.gestoresForm.reset();
    this.gestores.clear()
    this.adicionarGestor();
    this.resetSetteper();
    this.listaArquivos = [];
    this.listaQuadroDemonstrativo = [];
    this.listaEmpenhosPorContrato = [];
  }
}
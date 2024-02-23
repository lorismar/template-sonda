import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { GarantiasModel } from '../../../model/garantias-model';
import { GarantiasService } from '../../../services/contratos/garantias.service';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { addDays, format, parse, parseISO } from 'date-fns';
import { CadastroContratosService } from 'src/app/services/contratos/cadastro-constratos.service';
import { debounceTime } from 'rxjs';
import { UtilsService } from 'src/app/services/geral/utils.service';

export let garan = false;

@Component({
  selector: 'app-garantias',
  templateUrl: './garantias.component.html',
  styleUrls: ['./garantias.component.css'],
})
export class GarantiasComponent implements OnInit {
  public form: FormGroup;
  public formDadosBasicos: FormGroup;
  public formDatasPrazos: FormGroup;
  btnChecked = {};
  btnSelected = {};
  public isDisabled: boolean = false;
  public isDisabledAjustavel: boolean = false;
  public isDisabledDiasUteis: boolean = false;
  public ngForm: NgForm;
  public garantias = new GarantiasModel();
  public condicionalgarantiaContratualNao: boolean = false;
  public condicionalgarantiaContratualSim: boolean = false;
  public condicionalgarantiaContratualDisabled: boolean = false;
  public condicionalprazoGarantiaNao: boolean = false;
  public condicionalprazoGarantiaSim: boolean = false;
  public condicionalprazoGarantiaDisabled: boolean = false;
  public condicionalprorrogacaoPrazoNao: boolean = false;
  public condicionalprorrogacaoPrazoSim: boolean = false;
  public idContrato: any;
  public garanValidar: boolean = false;

  public dataPrazoVigenciaGarantia: any;
  public dataLimiteApresenta: any;
  public novaDataLimites: any;

  public teminoVigenciaGarantia: any;
  public vigenciaDaGarantia: any;
  public novoTerminoVigencia: any;

  public calc: boolean = false;

  idGarantia: any;

  constructor(
    private garantiasService: GarantiasService,
    private router: Router,
    private toastr: ToastrService,
    private formService: CadastroContratosService,
    private utils: UtilsService,
    public activatedRoute: ActivatedRoute
  ) {
    this.idContrato = activatedRoute.snapshot.params['idContrato'];
  }

  ngOnInit(): void {
    this.form = this.formService.getForm('garantias');
    this.formDadosBasicos = this.formService.getForm('dadosBasicos');
    this.formDatasPrazos = this.formService.getForm('datasPrazos');
    setTimeout(() => {
      this.dataTerminoVigencia();
    }, 500) 

    this.form.get('prazoGarantia')?.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
        this.prazoVigenciaGarantia();
    })
    this.form.get('marcoInicial')?.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
        this.dataVigenciaGarantia();
    })
    this.form.get('prazoProrrogacaoApresentacaoGarantia')?.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
        this.dataNovoTermino();
    })
    this.form.get('percentual')?.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
        this.valorTotalGarantia();
    })
    this.form.get('prazoApresentacaoGarantia')?.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
        this.dataLimiteApresentacao();
    })
    this.form.get('quantidadeDiasUteisProrrogacao')?.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
        this.novaDataLimite();
        this.dataNovoTermino();
    })
    this.form.get('tipoPrazoGarantia')?.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
        this.prazoVigenciaGarantia();
    })
    this.form.get('garantiaContratual')?.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
        this.garantia(this.form.value.garantiaContratual === 'S')
        this.ajustavel(this.form.value.prazoGarantiaAjustavel === 'S')
        this.prorrogacao(this.form.value.prazoProrrogacaoApresentacaoGarantia === 'S')
    })
  }

  getByIdGarantias(idContrato: any) {

  }

  garantia(active: boolean) {
    if(!active){
      this.form.disable();
      this.form.get('garantiaContratual')?.enable();
      this.form.get('idGarantia')?.enable();
    }else{
      this.form.enable();
    }
  }
  ajustavel(active: boolean) {
    if(!active) {
      this.form.get('marcoInicial')?.disable();
    }else {
      this.form.get('marcoInicial')?.enable();
    }
  }
  prorrogacao(active: boolean) {
    if(!active) {
      this.form.get('quantidadeDiasUteisProrrogacao')?.disable();
    }else {
      this.form.get('quantidadeDiasUteisProrrogacao')?.enable();
    }
  }

  valorTotalGarantia() {
    if(!this.form.value.percentual || !this.formDadosBasicos.value.valorTotal) return
    const valor = this.formDadosBasicos.value.valorTotal;
    const percentual = this.form.value.percentual;
    const resultado = (valor * percentual) / 100;
    this.form.get('valor')?.setValue(resultado);
  }
  prazoVigenciaGarantia() {
    if(!this.form.value.prazoGarantia || !this.formDatasPrazos.value.dataAssinaturaContrato) return
    let aux: string;
    let data = parseISO(this.formDatasPrazos.value.dataAssinaturaContrato);
    let dias = this.form.value.prazoGarantia;
    let result;
    if(!this.form.value.tipoPrazoGarantia || this.form.value.tipoPrazoGarantia === 'DIAS'){
      result = addDays(data, dias);
    }else if (this.form.value.tipoPrazoGarantia === 'MESES') {
      result = new Date(
        data.getFullYear(),
        data.getMonth() + dias,
        data.getDate()
      );
    }else if (this.form.value.tipoPrazoGarantia === 'ANOS'){
      result = new Date(
        data.getFullYear() + dias,
        data.getMonth(),
        data.getDate());
    }
    aux = format(result as Date, 'dd/MM/yyyy');
    this.form.get('dataPrazoVigencia')?.patchValue(aux);
    this.dataPrazoVigenciaGarantia = aux;
  }

  dataLimiteApresentacao() {
    if(!this.form.value.prazoApresentacaoGarantia || !this.formDatasPrazos.value.dataInicioVigencia) return
    let aux: string;
    let data = parseISO(this.formDatasPrazos.value.dataInicioVigencia);
    let dias = this.form.value.prazoApresentacaoGarantia;
    const result = addDays(data, dias);
    aux = format(result, 'dd/MM/yyyy');
    this.form.get('dataLimiteApresentacao')?.patchValue(aux);
    this.dataLimiteApresenta = aux;
  }

  novaDataLimite() {
    if(!this.form.value.quantidadeDiasUteisProrrogacao || !this.form.value.dataLimiteApresentacao) return
    let aux: string;
    let data = this.parseDate(this.form.value.dataLimiteApresentacao);
    if(!data) data = parseISO(this.form.value.dataLimiteApresentacao);
    let dias = this.form.value.quantidadeDiasUteisProrrogacao;
    const result = addDays(data, dias);
    aux = format(result, 'dd/MM/yyyy');
    this.form.get('dataLimiteProrrogacao')?.patchValue(aux);

    this.novaDataLimites = aux;
  }

  dataTerminoVigencia() {
    if(!this.formDatasPrazos.value.dataInicioVigencia || !this.formDatasPrazos.value.prazoVigencia) return
    const data = parseISO(this.formDatasPrazos.value.dataInicioVigencia);
    const dias = this.formDatasPrazos.value.prazoVigencia + 90;
    const result = addDays(data, dias);
    const aux = format(result, 'dd/MM/yyyy');
    this.form.get('dataTerminoVigenciaGarantiaContratual')?.patchValue(aux);
    this.teminoVigenciaGarantia = aux;
  }
  dataVigenciaGarantia() {
    if(!this.form.value.prazoGarantia || !this.form.value.marcoInicial) return
    const dias = this.form.value.prazoGarantia;
    const marco = this.form.value.marcoInicial;
    let data: Date;
    if(marco === 'DATA_RECEBIMENTO_DEFINITIVO'){
      data = parseISO(this.formDatasPrazos.value.dataLimiteRecebimento);
    }else {
      data = parseISO(this.formDatasPrazos.value.dataInicioVigencia);
    }
    const result = addDays(data, dias);
    const aux = format(result, 'dd/MM/yyyy');
    this.form.get('dataVigenciaGarantiaAssistenciaTecnica')?.patchValue(aux);

    this.vigenciaDaGarantia = aux;
  }
  dataNovoTermino() {
    if(!this.form.value.prazoGarantia || !this.form.value.marcoInicial) return
    const dias = this.form.value.prazoGarantia + 90;
    const marco = this.form.value.marcoInicial;
    let data: Date;
    if(marco === 'DATA_RECEBIMENTO_DEFINITIVO'){
      data = parseISO(this.formDatasPrazos.value.dataLimiteRecebimento);
    }else {
      data = parseISO(this.formDatasPrazos.value.dataInicioVigencia);
    }
    const result = addDays(data, dias);
    const aux = format(result, 'dd/MM/yyyy');
    this.form.get('dataNovoTerminoVigencia')?.patchValue(aux);
    this.novoTerminoVigencia = aux;
  }

  parseToShow(dateString: string): string {
    let data = this.parseDate(dateString);
    return format(data, 'dd/MM/yyyy');
  }

  parseDate(dateString: string): Date {
    const parts = dateString.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
  
    return new Date(year, month, day);
  }

  parseFormat(date: string): string {
    const dateObj = this.parseDate(date);
    return format(dateObj, 'yyyy-MM-dd')
  }


  salvar() {
    if(this.form.pristine) {
      this.router.navigate(['/home/contrato/empenho/' + this.idContrato]);
      return
    }
    if(!this.formDadosBasicos.value.valorTotal) {
      this.toastr.warning('Preencha o Quadro Demonstrativo antes de preencher as Garantias.');
      this.router.navigate(['/home/contrato/quadro-demonstrativo/'+ this.idContrato]);
      return
    }
    if(this.idContrato && this.idContrato != 'novo') {
        if(
          (this.form.value.dataPrazoVigencia && !this.formDatasPrazos.value.dataAssinaturaContrato) ||
          (this.form.value.percentual && !this.formDadosBasicos.value.valorTotal) ||
          (this.form.value.prazoApresentacaoGarantia && !this.formDatasPrazos.value.dataInicioVigencia) ||
          (this.form.value.quantidadeDiasUteisProrrogacao && !this.form.value.dataLimiteApresentacao)
          ) {
          this.toastr.warning('Preencha as Datas e Prazos antes de preencher as Garantias.');
          this.router.navigate(['/home/contrato/datas-prazos/'+ this.idContrato]);
          return
        }else {
          let data = this.form.value;
          data.dataPrazoVigencia = this.form.value.dataPrazoVigencia ? this.parseFormat(this.form.value.dataPrazoVigencia) : null;
          data.dataLimiteApresentacao = this.form.value.dataLimiteApresentacao ? this.parseFormat(this.form.value.dataLimiteApresentacao) : null;
          data.dataLimiteProrrogacao = this.form.value.dataLimiteProrrogacao ? this.parseFormat(this.form.value.dataLimiteProrrogacao) : null;
          data.dataTerminoVigenciaGarantiaContratual = this.form.value.dataTerminoVigenciaGarantiaContratual ? this.parseFormat(this.form.value.dataTerminoVigenciaGarantiaContratual) : null;
          data.dataVigenciaGarantiaAssistenciaTecnica = this.form.value.dataVigenciaGarantiaAssistenciaTecnica ? this.parseFormat(this.form.value.dataVigenciaGarantiaAssistenciaTecnica) : null;
          data.dataNovoTerminoVigencia = this.form.value.dataNovoTerminoVigencia ? this.parseFormat(this.form.value.dataNovoTerminoVigencia) : null;     
          data.idContrato = this.idContrato;
          if (!this.form.value.idGarantia) {
            this.garantiasService.salvarGarantias(data).subscribe({
              next: (response) => {
                this.form.patchValue({idGarantia: response.id});
                this.toastr.success('Garantias cadastrada com sucesso!');
                this.formService.progress['garantias'] = true;
                this.router.navigate(['/home/contrato/empenho/' + this.idContrato]);
              },
              error: (error) => {
                console.log(error);
                this.toastr.error(error);
              },
            });
          } else {
            this.garantiasService
              .editarGarantias(this.form.value.idGarantia, data)
              .subscribe({
                next: (response) => {
                  this.toastr.success('Garantias editadas com sucesso!');
                  this.formService.progress['garantias'] = true;
                  this.router.navigate(['/home/contrato/empenho/' + this.idContrato]);
                },
                error: (err) => {
                  console.log(err);
                  this.toastr.error(err);
                },
              });
          }
        }
    }else {
      const dadosBasicosForm = this.formService.getForm('dadosBasicos');
      this.utils.markFormGroupTouched(dadosBasicosForm);
      this.toastr.error('Preencha e salve os dados básicos antes de continuar.');
      this.router.navigate(['/home/contrato/dados-basicos']);
    }
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { DatasPrazosService } from '../../../services/contratos/datas-prazos.service';
import { DatasPrazosModel } from '../../../model/datas-prazos-model';
import { add, addDays, format, parse, parseISO } from 'date-fns';

import {
  RecebimentoDefinitivoEnum,
  RecebimentoDefinitivoEnumLabel,
} from '../../../components/shared/enums/recebimento-definitivo.enum';
import { SimNaoEnum, SimNaoEnumLabel } from '../../../components/shared/enums/sim-nao.enum';
import {
  GarantiaEnum,
  GarantiaEnumLabel,
} from '../../../components/shared/enums/garantia.enum';
import {
  TipoPrazoEnum,
  TipoPrazoEnumLabel,
} from '../../../components/shared/enums/tipo-prazo.enum';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { CadastroContratosService } from 'src/app/services/contratos/cadastro-constratos.service';
import { UtilsService } from 'src/app/services/geral/utils.service';
import { debounceTime } from 'rxjs';

export let datas_prazos = false;


@Component({
  selector: 'app-datas-prazos',
  templateUrl: './datas-prazos.component.html',
  styleUrls: ['./datas-prazos.component.css'],
})
export class DatasPrazosComponent implements OnInit {
  public form: FormGroup;
  public recebimentoDefinitivoEnumLabel = RecebimentoDefinitivoEnumLabel;
  public simNaoEnumLabel = SimNaoEnumLabel;
  public garantiaEnumLabel = GarantiaEnumLabel;
  public tipoPrazoEnumLabel = TipoPrazoEnumLabel;

  datasPrazos = new DatasPrazosModel();
  recebimentoDefinitivo = Object.values(RecebimentoDefinitivoEnum);
  continuado = Object.values(SimNaoEnum);
  garantia = Object.values(GarantiaEnum);
  tipoPrazoMaximoVigencia = Object.values(TipoPrazoEnum);
  tipoPrazoDeVigencia = Object.values(TipoPrazoEnum);
  tipoPrazoGarantia = Object.values(TipoPrazoEnum);

  idContrato: any;
  public editandoContrato: any;
  editando: boolean;

  constructor(
    private formService: CadastroContratosService,
    private datasPrazosService: DatasPrazosService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private utils: UtilsService
  ) { 
    this.form = this.formService.getForm('datasPrazos');
    this.idContrato = this.activatedRoute.snapshot.params['idContrato'];
  }
  
  ngOnInit(): void {
    this.form.get('prazoEntrega')?.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.dataLimiteEntrega();
    })
    this.form.get('dataAssinaturaContrato')?.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.dataLimiteEntrega();
      this.dataLimiteProrrogacao();
    })
    this.form.get('dataLimiteEntrega')?.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.dataLimiteRecebimentoDefinitivo();
    })
    this.form.get('prazoRecebimentoProvisorio')?.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.dataLimiteRecebimentoDefinitivo();
    })
    this.form.get('prazoRecebimentoDefinitivo')?.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.dataLimiteRecebimentoDefinitivo();
    })
    this.form.get('prazoPagamento')?.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.dataLimitePagamento();
    })
    this.form.get('prazoMaximoVigencia')?.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.dataFimVigencia();
      this.dataLimiteProrrogacao();
    })
    this.form.get('dataInicioVigencia')?.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.dataFimVigencia();
      this.prazoMaximoVigencia();
    })
  }

  definirPrazo() {
    if(this.form.value.tipoPrazoPagamento === 'CINCO_DIAS_UTEIS') {
      this.form.patchValue({
        periodicidadePrazoPagamento: 'DIAS_UTEIS',
        prazoPagamento: 5
      })
    }else if(this.form.value.tipoPrazoPagamento === 'NOVE_DIAS_UTEIS'){
      this.form.patchValue({
        periodicidadePrazoPagamento: 'DIAS_UTEIS',
        prazoPagamento: 9
      })
    }else if(this.form.value.tipoPrazoPagamento === 'TRINTA_DIAS_CONSECUTIVOS'){
      this.form.patchValue({
        periodicidadePrazoPagamento: 'DIAS_CONSECUTIVOS',
        prazoPagamento: 30
      })
    }else {
      this.form.patchValue({
        periodicidadePrazoPagamento: null,
        prazoPagamento: null
      })
    }
  }

  salvarDatasPrazos() {
    const dadosBasicosForm = this.formService.getForm('dadosbasicos');
    const idContrato = dadosBasicosForm.value.idContrato;
    if(idContrato) {
        if(this.form.valid) {
          this.form.patchValue({idContrato: idContrato})
          if(!this.form.value.idDataPrazo) {
            this.datasPrazosService.salvarDataPrazos(this.form.value).subscribe({
              next: (data: any) => {
                this.toastr.success('Datas e Prazos salvos!');
                this.form.patchValue({idDataPrazo: data.id})
                datas_prazos = true
                this.formService.progress['datasPrazos'] = true;
                this.router.navigate(['/home/contrato/gestores/', idContrato]);
              },
              error: (err: any) => {
                this.toastr.error( 'Verifique os campos para preenchimento');
        
              },
            });
          }else {
            this.datasPrazosService.editarDataPrazos(this.form.value, this.form.value.idDataPrazo).subscribe({
              next: (data: any) => {
                this.toastr.success('Datas e Prazos atualizados!');
                datas_prazos = true
                this.formService.progress['datasPrazos'] = true;
                this.router.navigate(['/home/contrato/gestores/', idContrato]);
              },
              error: (err: any) => {
                this.toastr.error( 'Verifique os campos para preenchimento');
        
              },
            });
          }
       }
    }else {
      this.utils.markFormGroupTouched(dadosBasicosForm);
      this.toastr.error('Preencha e salve os dados básicos antes de continuar.');
      this.router.navigate(['/home/contrato/dados-basicos']);
    }
  }

  dataLimiteEntrega() {
    let data = this.form.value.dataAssinaturaContrato;
    let dias = this.form.value.prazoEntrega;
    if(!data || !dias) return
    data = parseISO(this.form.value.dataAssinaturaContrato);
    const result = addDays(data, dias);
    this.form.patchValue({dataLimiteEntrega: format(result, 'yyyy-MM-dd')})
  }
  dataLimiteRecebimentoDefinitivo() {
    let data = this.form.value.dataLimiteEntrega;
    let diasProv = this.form.value.prazoRecebimentoProvisorio;
    let dias = this.form.value.prazoRecebimentoDefinitivo;
    if(!data || !diasProv || !dias) return 
    data = parseISO(this.form.value.dataLimiteEntrega);
    const result = addDays(data, dias + diasProv);
    this.form.patchValue({dataLimiteRecebimento: format(result, 'yyyy-MM-dd')})
  }
  dataLimitePagamento() {
    let data = this.form.value.dataAssinaturaContrato;
    let dias = this.form.value.prazoPagamento;
    if(!dias || !data) return
    data = parseISO(this.form.value.dataAssinaturaContrato);
    const result = addDays(data, dias);
    this.form.patchValue({dataLimitePagamento: format(result, 'yyyy-MM-dd')});
  }
  dataLimiteProrrogacao() {
    let data = this.form.value.dataAssinaturaContrato;
    let amount =  this.form.value.prazoMaximoVigencia;
    if(!data || !amount) return
    switch (this.form.value.tipoPrazoMaximoVigencia) {
      case 'DIAS':
        data = parseISO(data);
        const result = addDays(data, amount);
        this.form.patchValue({dataLimiteProrogacao: format(result, 'yyyy-MM-dd')});
        break;
      case 'MESES':
        data = parse(
          data,
          'yyyy-MM-dd',
          new Date()
        );
        let meses = new Date(
          data.getFullYear(),
          data.getMonth() + amount,
          data.getDate()
        );
        this.form.patchValue({dataLimiteProrogacao: format(meses, 'yyyy-MM-dd')});
        break;
      case 'ANOS':
        const dataStr = data;
        const convertDataStrToDate = parse(dataStr, 'yyyy-MM-dd', new Date());
        const somaAnosAData = new Date(
          convertDataStrToDate.getFullYear() + amount,
          convertDataStrToDate.getMonth(),
          convertDataStrToDate.getDate()
        );
        this.form.patchValue({dataLimiteProrogacao: format(somaAnosAData,'yyyy-MM-dd')});
        break;
    }
  }

  dataFimVigencia() {
    let data = this.form.value.dataInicioVigencia;
    let amount = this.form.value.prazoMaximoVigencia;
    const tipo = this.form.value.tipoPrazoMaximoVigencia
    if(!data || !amount || !tipo) return
    switch (tipo) {
      case 'DIAS':
        data = parseISO(data);
        const result = addDays(data, amount);
        this.form.patchValue({dataFimVigencia: format(result, 'yyyy-MM-dd')});
        break;
      case 'MESES':
        data = parse(
          data,
          'yyyy-MM-dd',
          new Date()
        );
        var meses = new Date(
          data.getFullYear(),
          data.getMonth() + amount,
          data.getDate()
        );
        this.form.patchValue({dataFimVigencia: format(meses, 'yyyy-MM-dd')});
        break;
      case 'ANOS':
        const dataStr = data;
        const anos = amount;
        const convertDataStrToDate = parse(dataStr, 'yyyy-MM-dd', new Date());
        const somaAnosAData = new Date(
          convertDataStrToDate.getFullYear() + anos,
          convertDataStrToDate.getMonth(),
          convertDataStrToDate.getDate()
        );
        this.form.patchValue({dataFimVigencia: format(somaAnosAData, 'yyyy-MM-dd')});
        break;
    }
  }

  prazoMaximoVigencia() {
    let dataFim = this.form.value.dataFimVigencia;
    let dataInicio = this.form.value.dataInicioVigencia
    if(!dataFim || !dataInicio) return
    dataFim = parseISO(this.form.value.dataFimVigencia);
    dataInicio = parseISO(this.form.value.dataInicioVigencia);
    const diferencaEmMilissegundos: number = dataInicio.getTime() - dataFim.getTime();
    const diferencaEmDias: number = diferencaEmMilissegundos / (1000 * 60 * 60 * 24);
    const result = diferencaEmDias * -1
    this.form.patchValue({prazoMaximoVigencia: result});
    this.form.patchValue({tipoPrazoMaximoVigencia: 'DIAS'});
  }
}

import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CadastroEmpenhoService } from 'src/app/services/contratos/cadastro-empenho.service';
import {
  DocumentoOrigemEnum,
  DocumentoOrigemEnumLabel,
} from 'src/app/components/shared/enums/documento-origem.enum';
import {
  ModalidadeEmpenhoEnum,
  ModalidadeEmpenhoEnumLabel,
} from 'src/app/components/shared/enums/modalidade.enum';
import {
  TipoEmpenhoEnum,
  TipoEmpenhoEnumLabel,
} from 'src/app/components/shared/enums/tipo-empenho.enum';
import { EmpenhoModel } from '../../../../model/cadastro-empenho-model';
import { CadastroContratosService } from 'src/app/services/contratos/cadastro-constratos.service';
import { UtilsService } from 'src/app/services/geral/utils.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-empenho-novo',
  templateUrl: './cadastro-empenho-novo.component.html',
  styleUrls: ['./cadastro-empenho-novo.component.css'],
})
export class CadastroEmpenhoNovoComponent implements OnInit {
  @Input() empenho: EmpenhoModel;
  dataAtual = new Date();
  anoAtual = this.dataAtual.getFullYear();
  public idEmpenho: any;
  public modalidadeEmpenhoLabel = ModalidadeEmpenhoEnumLabel;
  public tipoEmpenhoEnumLabel = TipoEmpenhoEnumLabel;
  public documentoEnumLabel = DocumentoOrigemEnumLabel;
  public empenhos = Object.values(ModalidadeEmpenhoEnum);
  public tipos = Object.values(TipoEmpenhoEnum);
  public documentos = Object.values(DocumentoOrigemEnum);
  editando = false;
  public idContrato: any

  public form: FormGroup;

  listaEmpenhosPorContrato: any[];

  constructor(
    private cadastroEmpenhoService: CadastroEmpenhoService,
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private formService: CadastroContratosService,
    private utils: UtilsService,
    public modal: NgbActiveModal,
    public fb: FormBuilder
  ) {
    if(!this.empenho) this.empenho = new EmpenhoModel();
    this.form = this.fb.group({
      idEmpenho: [null],
      numeroEmpenho: [null, Validators.required],
      valor: [null, Validators.required],
      modalidade: [null, Validators.required],
      tipoEmpenho: [null, Validators.required],
      fonteRecurso: [null, Validators.required],
      funcionalProgramatica: [null, Validators.required],
      pa: [null, Validators.required],
      elementoDespesa: [null, Validators.required],
      documentoOrigem: [null, Validators.required]
    });
   }
  ngOnInit() {
    this.idContrato = this.utils.extractId(window.location.pathname);
    this.empenho.idContrato = this.idContrato;
  }

  salvarEmpenho() {
    if(this.idContrato && this.idContrato != 'novo') {
      if(this.form.valid) {
          let data = {...this.form.value, 
            numeroEmpenho: this.anoAtual + 'NE' + this.form.value.numeroEmpenho,
            fonteRecurso: +this.form.value.fonteRecurso,
            funcionalProgramatica: +this.form.value.funcionalProgramatica,
            pa: +this.form.value.pa,
            elementoDespesa: +this.form.value.elementoDespesa
           };
          this.cadastroEmpenhoService.salvarEmpenho(data).subscribe({
            next: (response) => {
              if(response){
                data.idEmpenho = response.id;
                this.modal.close(data);
              }
              this.toastr.success('Empenho cadastrado com sucesso!');
            },
            error: (err) => {
              console.error(err);
              this.toastr.error('Ocorreu um erro ao salvar o empenho.');
            },
          });
      }else {
        this.toastr.error('Preencha todos os campos do formulário.');
      }
    }else {
      const dadosBasicosForm = this.formService.getForm('dadosBasicos');
      this.utils.markFormGroupTouched(dadosBasicosForm);
      this.toastr.error('Preencha e salve os dados básicos antes de continuar.');
      this.router.navigate(['/home/contrato/dados-basicos', this.idContrato]);
    }

  }

  getListaEmpenhosPorContrato() {
    this.cadastroEmpenhoService
      .listarEmpenhos(this.empenho.idContrato)
      .subscribe((data: any) => {
        this.listaEmpenhosPorContrato = data;
        console.log(data);
      });
  }

  limparCampos() {
    this.form.reset();
    // console.log(this.form.value);
  }

}

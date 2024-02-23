import { DadosBasicosModel } from '../../../model/dadosBasicos-model';
import { Component, OnInit } from '@angular/core';
import { FinalizarContratoService } from 'src/app/services/contratos/finalizar-contrato.service';
import { ToastrService } from 'ngx-toastr';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { CadastroContratosService } from 'src/app/services/contratos/cadastro-constratos.service';
import { ModalLinkArquivoComponent } from 'src/app/shared/components/modal-link-arquivo/modal-link-arquivo.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-finalizar-contrato',
  templateUrl: './finalizar-contrato.component.html',
  styleUrls: ['./finalizar-contrato.component.css'],
})
export class FinalizarContratoComponent implements OnInit {
  idContrato: any;
  public dadosBasicos = new DadosBasicosModel();
  public datasPrazos: any = null;
  public gestores: any = [];
  public dadosGestor: any = [];
  public fiscal: any = [];
  public garantias : any = null;
  public empenhos : any = null;
  public itensQuadroDemonstrativo: any[];
  public itensEmpenhos: any[];
  public processosDadosBasicos: any[] = [];
  visualizaContrato: boolean;
  public editandoContrato: any;
  editando: boolean;

  validaCampo: boolean = false;

  public tipoContratacao: any = {
    "AQUISICAO": 'Aquisição',
    "FORNECIMENTO": 'Fornecimento',
    "SERVICO": 'Serviço'
  }
  public modalidadeLicitacao: any = {
    "ATA_REGISTRO_PRECO": "Ata de Registro de Preço",
    "CONCORRENCIA": "Concorrência",
    "CONCURSO": "Concurso",
    "CONVITE": "Convite",
    "DIALOGO_COMPETITIVO": "Diálogo competitivo",
    "LEILAO": "Leilão",
    "PREGAO_ELETRONICO": "Pregão Eletrônico",
    "PREGAO_PRESENCIAL": "Pregão Presencial",
    "TOMADA_DE_PRECOS": "Tomada de Preços"
    }

    public recebimentoDefinitivo: any = {
      "COMISSAO": "Comissão",
      "GESTOR": "Gestor"
    }

    public areaContratacao: any = {
    "AQUISICAO": "Aquisição",
    "CAPACITACAO": "Capacitação",
    "OBRA_SERVICO_ENGENHARIA": "Obras e Serviços de Engenharias",
    "SERVICO": "Serviço",
    "TI": "T.I"
    }

    public modalidadeGarantia: any = {
      "ESPECIE_OU_TITULO_DIVIDA_PUBLICA": "Em espécie ou título da dívida pública",
      "APOLICE": "Apólice",
      "FIANCA_BANCARIA": "Fiança bancária"
      }

    public marcoInicial: any = {
      "DATA_RECEBIMENTO_DEFINITIVO": "Data do recebimento definitivo",
      "ATIVACAO_LICENCA": "Ativação da licença"
      }
    public tipoGestor: any = {
      GESTOR: 'Gestor',
      FISCAL_TECNICO: 'Fiscal Técnico',
      FISCAL_ADMINISTRATIVO: 'Fiscal Administrativo',
      FISCAL_DEMANDANTE: 'Fiscal Demandante'
    }
  constructor(
    private finalizarContratoService: FinalizarContratoService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formService: CadastroContratosService,
    private modalService: NgbModal
  ) {
    this.idContrato = this.activatedRoute.snapshot.params['idContrato'];
  }

  ngOnInit(): void {

    this.finalizarContratoService
      .getContratoFinalizar(this.idContrato)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.dadosBasicos = data.dadosBasicos;
          this.processosDadosBasicos = data.dadosBasicos.processos;
          this.datasPrazos = data.datasPrazos;
          this.gestores = data.gestores;
          this.garantias = data.garantia;
          this.itensEmpenhos = data.empenhos;
          this.itensQuadroDemonstrativo = data.itensQuadroDemonstrativo;
        },
        error: (data: any) => {
          console.log(data);
        },
      });
  }

  salvarFinalizarContrato() {
    const modal = this.modalService.open(ModalLinkArquivoComponent);
    modal.closed.subscribe({
      next: (data: any) => {
        if(data) {
          data.idContrato = this.idContrato;
          this.datasPrazos.idContrato = this.idContrato;
          this.finalizarContratoService.finalizarContrato(data).subscribe({
            next: () => {
              this.toastr.success('Contrato finalizado com sucesso');
              this.router.navigate(['/home']);
            },
            error: (err: any) => {
              this.toastr.error(err.error.message.replace('Erro', ''));
            },
          });
        }}
      })
  }

  checkForm() {
    if(
      this.formService.progress['dadosbasicos'] &&
      this.formService.progress['garantias'] &&
      this.formService.progress['datasPrazos'] &&
      this.formService.progress['gestores'] &&
      this.formService.progress['quadroDemonstrativo'] &&
      this.formService.progress['empenhos'] &&
      this.dadosBasicos.status != "ASSINADO"
    ) {
      return true
    }else return false
  }
}

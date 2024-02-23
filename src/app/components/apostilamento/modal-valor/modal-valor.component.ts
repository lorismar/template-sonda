import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from 'src/app/services/geral/utils.service';
import { IndiceCorrecaoService } from 'src/app/services/indice-correcao/indice-correcao.service';
import { TermoAditivoService } from 'src/app/services/termo-aditivo/termo-aditivo.service';
import { Item, Map } from 'src/app/types/termo-aditivo';

@Component({
  selector: 'app-modal-valor',
  templateUrl: './modal-valor.component.html',
  styleUrls: ['./modal-valor.component.scss']
})


export class ModalValorComponent implements OnInit{
  @Input() info: any;
  @Input() data: any;
  @Input() contrato: any;
  private bouncer: any;
  public indices: any[] = [];
  public houveNegociacao: string = 'N';
  public percentualNegociado: any;
  public valorNegociado: any;
  public valorContratoNegociado: any;
  public idAcaoApostilamento: any;
  // public percentualCorrecao: any;
  public valorApostilamento: any = 0;
  public valorContratoAtualizado: any;
  public mesPorValor: Map = {
    "JANEIRO": "Janeiro",
    "FEVEREIRO": "Fevereiro",
    "MARCO": "Março",
    "ABRIL": "Abril",
    "MAIO": "Maio",
    "JUNHO": "Junho",
    "JULHO": "Julho",
    "AGOSTO": "Agosto",
    "SETEMBRO": "Setembro",
    "OUTUBRO": "Outrubro",
    "NOVEMBRO": "Novembro",
    "DEZEMBRO": "Dezembro"
  };
  public search: boolean = false;
  public loading: boolean = false;
  public listaQuadroDemonstrativo: any[] = [];
  private idIndiceCorrecao: any;
  public selectedIndice: any;

  ngOnInit(): void {
    if(this.data) {
      this.idAcaoApostilamento = this.data.idAcaoApostilamento;
      this.houveNegociacao = this.data.acaoAlteracaoValor.houveNegociacao;
      this.percentualNegociado = this.data.acaoAlteracaoValor.percentualNegociado;
      this.valorNegociado = this.data.acaoAlteracaoValor.valorNegociado;
      this.valorContratoNegociado = this.data.acaoAlteracaoValor.valorContratoNegociado;
      // this.percentualCorrecao = this.data.acaoAlteracaoValor.percentualCorrecao;
      this.valorApostilamento = this.data.acaoAlteracaoValor.valorApostilamento;
      this.valorContratoAtualizado = this.data.acaoAlteracaoValor.valorContratoAtualizado;
      this.idIndiceCorrecao = this.data.acaoAlteracaoValor.idIndiceCorrecao;
      this.selectedIndice = this.data.acaoAlteracaoValor.idIndiceCorrecao;
    }else {
      this.valorApostilamento = 0
      this.valorNegociado = this.info.valorOriginalContrato;
      this.valorContratoAtualizado = this.valorAtualContrato;
      this.valorContratoNegociado = 0
    }
    if(this.contrato) {
      this.getQuadroDemonstrativo();
    }
  }
  
  constructor(
    public activeModal: NgbActiveModal,
    public utils: UtilsService,
    public toastr: ToastrService,
    private termoAditivoService: TermoAditivoService,
    private indiceCorrecaoService: IndiceCorrecaoService

  ) {

  }

  buscarIndices($event: any) {
    clearTimeout(this.bouncer);
    this.bouncer = setTimeout(() => {
      this.getIndices($event.target.value);
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
            this.search = true;
        }else {
          this.indices = [];
        }
      }
    })
  }

  selecionarIndice(indice: any) {
    this.idIndiceCorrecao = indice.idIndiceCorrecao;
    this.selectedIndice = indice.nome + ' - ' + indice.codigo.slice(0, 50) + (indice.codigo.length > 49 ? '...' : '');
    this.search = false;
  }

  get percentualCorrecao(): number {
    const total = this.calcValorTotal();
    const percentual = (total * 100) / this.valorAtualContrato;
    return this.utils.arred(percentual - 100, 2)
  }

  calcValorTotal(): number {
    let sum: number = 0;
    for(let item of this.listaQuadroDemonstrativo){
      const quantidade = item.quantidadeOriginal + item.quantidadeAdicional - item.quantidadeSupressao;
      if(item.percentualCorrecao) {
        const valorUnitario = this.calcValorUnitario(item);
        sum += this.utils.arred(valorUnitario * quantidade, 2)
      }else {
        sum += this.utils.arred(item.valorUnitario * quantidade, 2)
      }
    }
    return sum;
  }

  calcValorUnitario(item: any): number {
    if(item.percentualCorrecao) {
      return item.valorUnitario + (item.valorUnitario * item.percentualCorrecao/100);
    }else {
      return item.valorUnitario;
    }
  }

  valorTotalItem(item: Item): number {
    const valorUnitario = this.calcValorUnitario(item);
    const quantidade = item.quantidadeOriginal + item.quantidadeAdicional - item.quantidadeSupressao;
    return this.utils.arred(valorUnitario * quantidade, 2)
  }

  getQuadroDemonstrativo() {
    this.loading = true;
    this.termoAditivoService.getItemQD(this.contrato.idContrato).subscribe({
      next: (data: any) => {
      this.listaQuadroDemonstrativo = data
      this.listaQuadroDemonstrativo.forEach((item: any) => {
        item.quantidade = 0
        item.saldo = item.quantidadeOriginal + item.quantidadeAdicional  - item.quantidadeReservada
        item.valorUnitarioOriginal = item.valorUnitario
        item.valorTotalOriginal = item.valorTotal
        if(this.data){
          this.data.acaoAlteracaoValor.itensReajuste.forEach((alteracao: any) =>{
           if(item.idItemQuadroDemos === alteracao.idItemQuadroDemos) {
              item.idItemAcaoReajuste = alteracao.idItemAcaoReajuste
              item.percentualCorrecao = alteracao.percentualCorrecao;
              item.valorCorrecao = alteracao.valorCorrecao;
           }
          })
        }
      })
    },
    error: (err) => {
      this.toastr.error(err);
    },
    complete: () => {
      this.loading = false;
    }
  });
  }

  get valorAtualContrato() {
    return this.info.valorOriginalContrato + this.info.valorTermosAditivos + this.info.valorApostilamentos;
  }

  calcularPorcentagemNegociacao() {
    this.valorNegociado = this.utils.arred(this.info.valorOriginalContrato * (this.percentualCorrecao/100), 2);
    this.valorContratoNegociado = this.utils.arred(this.valorNegociado + this.info.valorOriginalContrato, 2);
    this.valorApostilamento = this.utils.arred(this.valorAtualContrato * (this.percentualCorrecao/100), 2);
    this.valorContratoAtualizado = this.utils.arred(this.valorAtualContrato + this.valorApostilamento, 2);
  }

  setNegociacao(){
    if(this.houveNegociacao == 'N'){
      this.valorContratoNegociado = 0;
      this.idIndiceCorrecao = null;
      this.selectedIndice = null;
    }
  }

  getItensRejuste() {
    return this.listaQuadroDemonstrativo
      .filter((item) => item.percentualCorrecao ? true : false)
      .map((item) => ({
        idItemAcaoReajuste: item.idItemAcaoReajuste,
        idItemQuadroDemos: item.idItemQuadroDemos,
        percentualCorrecao: +item.percentualCorrecao,
        valorCorrecao: this.calcValorUnitario(item) - item.valorUnitario,
      })); 
    }

  confirmSelection() {
    this.activeModal.close(this.utils.toJSON({
      idAcaoApostilamento: this.idAcaoApostilamento,
      houveNegociacao: this.houveNegociacao,
      percentualNegociado: this.houveNegociacao === 'S' ? this.percentualCorrecao : null,
      idIndiceCorrecao: this.houveNegociacao === 'S' ? this.idIndiceCorrecao : null,
      valorNegociado: this.valorNegociado,
      valorContratoNegociado: this.valorContratoNegociado,
      percentualCorrecao: this.percentualCorrecao,
      valorApostilamento: this.valorApostilamento,
      valorContratoAtualizado: this.valorContratoAtualizado,
      itensReajuste: this.getItensRejuste()
  }));
  }

  checkForm(): boolean {
    let valid = true
    if(
      !this.percentualCorrecao ||
      !this.valorApostilamento ||
      !this.valorContratoAtualizado
    ){
      valid = false;
    }else if(this.houveNegociacao == 'S'){
      if(!this.percentualCorrecao || !this.valorNegociado || !this.valorContratoNegociado || !this.idIndiceCorrecao){
        valid = false;
      }
    }
      return valid
    }



}

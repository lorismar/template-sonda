import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from 'src/app/services/geral/utils.service';
import { IndiceCorrecaoService } from 'src/app/services/indice-correcao/indice-correcao.service';
import { TermoAditivoService } from 'src/app/services/termo-aditivo/termo-aditivo.service';
import { Item, Map } from 'src/app/types/termo-aditivo';

@Component({
  selector: 'app-modal-reequilibrio',
  templateUrl: './modal-reequilibrio.component.html',
  styleUrls: ['./modal-reequilibrio.component.scss']
})
export class ModalReequilibrioComponent {
  @Input() info: any;
  @Input() data: any;
  @Input() contrato: any;
  private bouncer: any;
  public indices: any[] = [];
  public valorNegociado: any;
  // public percentualCorrecao: any;
  public valorTermoAditivo: any = 0;
  public valorContratoAtualizado: any;
  public idAcaoTermoAditivo: any;

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
      this.idAcaoTermoAditivo = this.data.acaoReajuste.idAcaoTermoAditivo;
      this.valorNegociado = this.data.acaoReajuste.valorNegociado;
      this.valorTermoAditivo = this.data.acaoReajuste.valorTermoAditivo;
      this.valorContratoAtualizado = this.data.acaoReajuste.valorContratoAtualizado;
      this.idIndiceCorrecao = this.data.acaoReajuste.idIndiceCorrecao;
      this.selectedIndice = this.data.acaoReajuste.idIndiceCorrecao;
    }else {
      this.valorTermoAditivo = 0
      this.valorNegociado = this.info.valorOriginalContrato;
      this.valorContratoAtualizado = this.valorAtualContrato;
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
          this.data.acaoReajuste.itensReajuste.forEach((alteracao: any) =>{
           if(item.idItemQuadroDemos === alteracao.idItemQuadroDemos) {
              item.idItemAcaoReajuste = alteracao.idItemAcaoReajuste;
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
    this.valorTermoAditivo = this.utils.arred(this.valorAtualContrato * (this.percentualCorrecao/100), 2);
    this.valorContratoAtualizado = this.utils.arred(this.valorAtualContrato + this.valorTermoAditivo, 2);
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
      idAcaoTermoAditivo: this.idAcaoTermoAditivo,
      valorNegociado: this.valorNegociado,
      percentualCorrecao: this.percentualCorrecao,
      valorTermoAditivo: this.valorTermoAditivo,
      valorContratoAtualizado: this.valorContratoAtualizado,
      itensReequilibrio: this.getItensRejuste()
  }));
  }

  checkForm(): boolean {
    let valid = true
    if(
      !this.percentualCorrecao ||
      !this.valorTermoAditivo ||
      !this.valorContratoAtualizado
    ){
      valid = false;
    }
      return valid
    }
}

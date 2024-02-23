import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuadroDemonstrativoService } from 'src/app/services/contratos/quadro-demonstrativo.service';
import { TQuadroDemonstrativoService } from 'src/app/services/termo-aditivo/quadro-demonstrativo.service';
import { faCircleUp, faCircleDown, faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';
import { TermoAditivoService } from 'src/app/services/termo-aditivo/termo-aditivo.service';
import { UtilsService } from 'src/app/services/geral/utils.service';
import { Item } from 'src/app/types/termo-aditivo';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-quadro-supressao',
  templateUrl: './modal-quadro-supressao.component.html',
  styleUrls: ['./modal-quadro-supressao.component.scss']
})
export class ModalQuadroSupressaoComponent {
  @Input() info: any
  @Input() contrato: any
  @Input() data: any
  public listaQuadroDemonstrativo: any = [];
  public faCircleUp = faCircleUp;
  public faCircleDown = faCircleDown;
  public faCircleArrowUp = faCircleArrowUp;
  public loading: boolean = false


  constructor(
    public activeModal: NgbActiveModal,
    private qdService: TQuadroDemonstrativoService,
    private contratoQDService: QuadroDemonstrativoService,
    private termoAditivoService: TermoAditivoService,
    private utils: UtilsService,
    public toastr: ToastrService
  ){

  }

  valorTotalItem(item: Item) {
    return this.utils.arred((+item.quantidade + item.quantidadeOriginal) * item.valorUnitario, 2)
  }

  get valorTotal()  {
    let calc = 0
    this.listaQuadroDemonstrativo.forEach((item: any) => {
      calc += this.valorTotalItem(item)
    })
    return this.utils.arred(calc, 2)
  }

  get percentualTA() {
    return this.utils.arred((this.valorTotal * 100 / this.info.valorOriginalContrato) - 100, 2)
  }

  get valorTA(){
    return this.utils.arred(this.valorTotal - this.info.valorOriginalContrato, 2)
  }

  ngOnInit(): void {
    if(this.contrato){
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
            this.data.acaoAlteracaoItemValor.itensQuadro.forEach((alteracao: any) =>{
             if(item.idItemQuadroDemos === alteracao.idItemQuadroDemosOriginal) {
                item.quantidade = alteracao.quantidade;
                item.valorUnitario = alteracao.valorUnitario;
             }
            })
          }
        })
      },
      error: (err) => {
        this.toastr.error(err)
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
    }
  }

  checkForm(): boolean {
    let check = true;
    this.listaQuadroDemonstrativo.forEach((item: any) => {
      if (item.valorUnitario > item.valorUnitarioOriginal){
        check = false;
      } 
    })
    return check
  }

  filtrarItens(itens: Item[]): Item[] {
    const itensFiltrados: Item[] = [];
    for (const item of itens) {
        if (item.valorUnitario > item.valorUnitarioOriginal) {
            this.toastr.error('Valor do item é maior do que o valor original.');
            return [];
        }
        if (item.saldo + item.quantidade < 0) {
          this.toastr.error('A quantidade não pode ser inferior ao saldo.');
          return [];
        }

        const itemEdicao = this.data?.acaoAlteracaoItemValor?.itensQuadro.filter(
          (val: any) =>
            item.idItemQuadroDemos === val.idItemQuadroDemosOriginal
        );

        if(item.idItemQuadroDemosOriginal) {
          itensFiltrados.push({
            ...item,
            valorTotal: this.valorTotalItem(item) - item.valorTotalOriginal,
            idItemQuadroDemos: itemEdicao
              ? itemEdicao[0]?.idItemQuadroDemos
              : undefined,
          });
        }else if (item.quantidade < 0 || item.valorUnitario < item.valorUnitarioOriginal) {
            itensFiltrados.push({
                ...item,
                idItemQuadroDemosOriginal: item.idItemQuadroDemos,
                idItemQuadroDemos: itemEdicao ? itemEdicao[0]?.idItemQuadroDemos : undefined,
                valorTotal: this.valorTotalItem(item) - item.valorTotalOriginal
            });
        }
    }
    return itensFiltrados;
}

buildObj(itens: Item[]) {
  return {
    valorTermoAditivo: this.valorTA,
    percentualAjustado: this.percentualTA,
    valorContratoAtualizado: this.valorTotal,
    itensQuadro: itens
  }
}

checkValue(index: any) {
  if(this.listaQuadroDemonstrativo[index].quantidade > 0) {
    this.listaQuadroDemonstrativo[index].quantidade *= -1
  }
}

// checkValueTotal(index: any) {
//   if(this.listaQuadroDemonstrativo[index].valorUnitario > this.listaQuadroDemonstrativo[index].valorUnitarioOriginal) {
//     this.listaQuadroDemonstrativo[index].valorUnitario *= -1
//   }
// }

  confirmSelection() {
    const itens = this.filtrarItens(this.listaQuadroDemonstrativo);
    if(itens.length < 1) return
    const response = this.buildObj(itens);
    this.activeModal.close(response);
  }

}

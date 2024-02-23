import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { addDays, format, parse, parseISO } from 'date-fns';
import { TermoAditivoService } from 'src/app/services/termo-aditivo/termo-aditivo.service';

@Component({
  selector: 'app-modal-prazo-vigencia',
  templateUrl: './modal-prazo-vigencia.component.html',
  styleUrls: ['./modal-prazo-vigencia.component.scss']
})
export class ModalPrazoVigenciaComponent {
  @Input() data?: any
  @Input() contrato: any
  @Input() info: any
  public loading: boolean = false;
  public tipoPrazoVigencia: string;
  public novoPrazoVigencia: number;
  public novaDataVigencia: any;
  constructor(
    public activeModal: NgbActiveModal,
    public termoAditivoService: TermoAditivoService,
    ) {}


  ngOnInit(): void {
    if(this.data){
      this.tipoPrazoVigencia = this.data.acaoPrazo.tipoPrazoVigencia;
      this.novoPrazoVigencia = this.data.acaoPrazo.novoPrazoVigencia;
      this.novaDataVigencia= this.data.acaoPrazo.novaDataVigencia;
    }
  }

  confirmSelection() {
    this.activeModal.close({tipoPrazoVigencia: this.tipoPrazoVigencia, novaDataVigencia: this.novaDataVigencia, novoPrazoVigencia: this.novoPrazoVigencia});
  }

  calcData() {
    let data = this.info.dataFimVigencia;
    let amount = +this.novoPrazoVigencia;
    const tipo = this.tipoPrazoVigencia
    if(!data || !amount || !tipo) return
    switch (tipo) {
      case 'DIAS':
        data = parseISO(data);
        const result = addDays(data, amount);
        this.novaDataVigencia = format(result, 'yyyy-MM-dd');
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
        this.novaDataVigencia = format(meses, 'yyyy-MM-dd');
        break;
      case 'ANOS':
        const dataStr = data;
        const convertDataStrToDate = parse(dataStr, 'yyyy-MM-dd', new Date());
        const somaAnosAData = new Date(
          convertDataStrToDate.getFullYear() + amount,
          convertDataStrToDate.getMonth(),
          convertDataStrToDate.getDate()
        );
        this.novaDataVigencia = format(somaAnosAData, 'yyyy-MM-dd');
        break;
    }
  }

}

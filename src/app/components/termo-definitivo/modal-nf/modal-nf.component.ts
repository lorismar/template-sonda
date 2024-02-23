import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from 'src/app/services/geral/utils.service';
import { ModalFornecedoresComponent } from 'src/app/shared/components/modal-fornecedores/modal-fornecedores.component';

@Component({
  selector: 'app-modal-nf',
  templateUrl: './modal-nf.component.html',
  styleUrls: ['./modal-nf.component.scss']
})
export class ModalNfComponent implements OnInit{
  @Input() data: any;
  @Input() contrato: any;
  public faSearch = faSearch;
  public periodo: any = {
    DIAS_UTEIS: 'dias úteis',
    DIAS_CONSECUTIVOS: 'dias consecutivos'
  }
  public form: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    public fb: FormBuilder,
    public utils: UtilsService,
    public modalService: NgbModal,
    public toastr: ToastrService,
    ) {
    this.form = this.fb.group({
      idNotaFiscal: [null],
      numero: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(9)]],
      cpfCnpj: [null, [Validators.required, this.utils.isCpfCnpj]],
      razaoSocial: [null, Validators.required],
      dataNotaFiscal: [null, Validators.required],
      dataRecebimentoNotaFiscal: [null],
      valorTotal: [null, Validators.required],
      dataPrevistaPagamento: [{value: null, readonly: true}],
      tipoContrato: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    if(this.data){
      this.form.patchValue(this.data);
    }
  }

  salvar() {
    if(this.form.valid) this.activeModal.close(this.form.value);
    else console.log(this.form);
  }

  calculatePaymentDate() {
    let paymentDate = new Date(this.form.value.dataRecebimentoNotaFiscal);
    for (let i = 0; i < this.contrato.prazoPagamento; ) {
      paymentDate.setDate(paymentDate.getDate() + 1);
      if (this.contrato.periodicidadePrazoPagamento === 'DIAS_UTEIS' && (paymentDate.getDay() === 0 || paymentDate.getDay() === 6)) {
        continue;
      }
      i++;
    }
    this.form.patchValue({dataPrevistaPagamento: this.utils.formatDate(paymentDate)});
  }

  get prazoPagamento() {
    return this.contrato.prazoPagamento + ' ' + this.periodo[this.contrato.periodicidadePrazoPagamento]
  }

  public pesquisarFornecedor() {
    const modal = this.modalService.open(ModalFornecedoresComponent, {
      size: 'lg'
    });
    modal.closed.subscribe({
      next: (data) => {
        if(data) this.form.patchValue({
          razaoSocial: data.razaoSocial,
          cpfCnpj: data.cpfCnpj
        });
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error);
      },
      complete: () => {
      }
    })
  }

}

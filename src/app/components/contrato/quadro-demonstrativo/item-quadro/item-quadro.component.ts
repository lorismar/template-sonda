import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-item-quadro',
  templateUrl: './item-quadro.component.html',
  styleUrls: ['./item-quadro.component.scss']
})
export class ItemQuadroComponent implements OnInit {
  @Input() item?: any;
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modal: NgbActiveModal
  ) {
    this.form = this.fb.group({
      idItemQuadroDemos: [null],
      item: [null, Validators.required],
      descricao: [null, Validators.required],
      grupo: [null],
      unidade: [null, Validators.required],
      quantidade: [null, Validators.required],
      valorUnitario: [null, Validators.required],
      valorTotal: [null, Validators.required],
    })

    this.form.get('valorUnitario')?.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.calcTotal();
    });
    this.form.get('quantidade')?.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.calcTotal();
    });
  }

  calcTotal() {
    if(this.form.value.valorUnitario && this.form.value.quantidade) {
      const total = this.form.value.valorUnitario * this.form.value.quantidade;
      this.form.patchValue({valorTotal: total});
    }else if(this.form.value.valorUnitario) {
      this.form.patchValue({valorTotal: this.form.value.valorUnitario});
    }else {
      this.form.patchValue({valorTotal: 0});
    }
  }

  ngOnInit(): void {
    if(this.item) this.form.patchValue(this.item);
  }

  limparCampos() {
    this.form.reset();
  }
  salvar() {
    if(this.form.valid) this.modal.close(this.form.value);
  }

  fechar() {
    this.modal.close();
  }
}

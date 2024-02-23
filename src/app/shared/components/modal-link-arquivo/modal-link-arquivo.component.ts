import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-link-arquivo',
  templateUrl: './modal-link-arquivo.component.html',
  styleUrls: ['./modal-link-arquivo.component.scss']
})
export class ModalLinkArquivoComponent {
  @Input() title: string;
  @Input() body: string;
  public form: FormGroup;

  constructor(public modal: NgbActiveModal, private fb: FormBuilder) {
    this.form = this.fb.group({
      dataAssinaturaDocumento: [''],
      linkDocumento: ['']
    })
  }
}
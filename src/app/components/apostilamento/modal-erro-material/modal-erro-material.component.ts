import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-erro-material',
  templateUrl: './modal-erro-material.component.html',
  styleUrls: ['./modal-erro-material.component.scss']
})
export class ModalErroMaterialComponent {
  @Input() data: any;
  public erroMaterial: string = '';
  public search: boolean = false;
  public loading: boolean = false;
  private bouncer: any;
  constructor(
    public activeModal: NgbActiveModal,
    ) {}
  ngOnInit(): void {
    if(this.data) {
      this.erroMaterial = this.data.acaoErroMaterial.erroMaterial
    }
  }

  confirmSelection() {
    this.activeModal.close(this.erroMaterial);
  }
}

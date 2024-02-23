import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-outros',
  templateUrl: './modal-outros.component.html',
  styleUrls: ['./modal-outros.component.scss']
})
export class ModalOutrosComponent implements OnInit {
  @Input() data: any;
  public outros: string;
  public search: boolean = false;
  public loading: boolean = false;
  private bouncer: any;
  constructor(
    public activeModal: NgbActiveModal,
    ) {}
  ngOnInit(): void {
    if(this.data) {
      this.outros = this.data.acaoOutros.outros
    }
  }

  confirmSelection() {
    this.activeModal.close(this.outros);
  }

}

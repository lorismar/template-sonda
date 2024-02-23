import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {
  @Input() title: string;
  @Input() body: string;
  @Output() confirm: EventEmitter<void> = new EventEmitter<void>();

  constructor(public modal: NgbActiveModal) {
  }
}

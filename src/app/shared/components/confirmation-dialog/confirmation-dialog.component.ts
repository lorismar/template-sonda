import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {
  @Input() title: string;
  @Input() body: string;
  @Output() confirm: EventEmitter<void> = new EventEmitter<void>();

  onConfirmClick(): void {
    this.confirm.emit();
  }
}

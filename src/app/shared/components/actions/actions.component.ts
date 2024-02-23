import { Component, ElementRef, HostListener, Input, Renderer2, ViewChild } from '@angular/core';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent {
  public faEllipsisVertical = faEllipsisVertical
  public show: boolean = false;
  
  constructor(private elRef: ElementRef) {}

  toggle() {
    this.show = !this.show;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.show = false;
    }
  }
}


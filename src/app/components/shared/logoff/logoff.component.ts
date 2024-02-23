import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, Injector, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-logoff',
  templateUrl: './logoff.component.html',
  styleUrls: ['./logoff.component.css']
})
export class LogoffComponent  implements OnInit {
  expirationTime: Date;
  private sessionTimeout: any;
  constructor(
    private modalService: NgbModal, 
    private authService: AuthService, 
    private injector: Injector, 
    public modal: NgbActiveModal) {
    
  }

  ngOnInit(): void {
    this.startSessionTimeout();
  }

  openSessionExpirationModal() {
    const modalRef = this.modalService.open(LogoffComponent);
    const component = modalRef.componentInstance;
  
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 30);
    component.expirationTime = expirationTime;
  
    modalRef.result.then((result) => {
      // Ação após fechar a janela modal
    }).catch((error) => {
      // Ação após fechar a janela modal com erro
    });
  }

  startSessionTimeout() {
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 30);
  
    this.sessionTimeout = setTimeout(() => {
      this.authService.deslogar();
    }, expirationTime.getTime() - Date.now());
  }
  
}

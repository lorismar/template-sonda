import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faCalendarCheck, faDesktop, faFileText, faKey, faUniversalAccess, faBoxArchive, faUser, faFileContract, faList, faFileInvoiceDollar, faFileInvoice, faFileExcel, faFilePen} from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { KeycloakService } from 'keycloak-angular';
import { ModalXmlComponent } from 'src/app/components/apostilamento/modal-xml/modal-xml.component';
import { Menu } from 'src/app/types/sidebar';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  @Input() menu: Menu[] | undefined;
  faFilePen = faFilePen;
  faFileExcel = faFileExcel;
  faFileInvoice = faFileInvoice;
  faFileContract = faFileContract;
  faList = faList;
  faFileText = faFileText;
  faKey = faKey
  faUniversalAccess = faUniversalAccess;
  faUser = faUser;
  faDesktop = faDesktop;
  faCalendarCheck = faCalendarCheck;
  faFileInvoiceDollar = faFileInvoiceDollar;
  faBoxArchive = faBoxArchive;
  opened = false;
  dadosUsuario: any;
  isLoggedIn: boolean = false;

  constructor(public modalService: NgbModal, private readonly keycloak: KeycloakService) {

  }

  async ngOnInit() {
    // this.dadosUsuario = JSON.parse(
    //   // window.atob(sessionStorage.getItem('userLogado')!)
    //   window.atob(localStorage.getItem('userLogado')!)
    // );

    this.isLoggedIn = await this.keycloak.isLoggedIn();
    console.log(this.isLoggedIn)
    if (this.isLoggedIn) {
      this.keycloak.loadUserProfile().then((data: KeycloakProfile) => {
        this.dadosUsuario = data
      });
    }
  }
  

  export() {
    const modalRef = this.modalService.open(ModalXmlComponent);
  }



}

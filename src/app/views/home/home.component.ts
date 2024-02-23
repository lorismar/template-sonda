import { Component, OnInit } from '@angular/core';
import { faCalendarCheck, faDesktop, faFileText, faKey, faUniversalAccess, faBoxArchive, faUser, faFileContract, faList, faFileInvoiceDollar, faFileInvoice, faFileExcel, faFilePen, faFileArrowUp, faFileUpload} from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { KeycloakService } from 'keycloak-angular';
import { ModalXmlComponent } from 'src/app/components/apostilamento/modal-xml/modal-xml.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public menu = [
    {
      label: "Cadastro de Contratos",
      permissions: ['SGC-Visualizar_Contrato', 'SGC-Visualizar_TermoAditivo', ],
      menu: [
        {
          label: "Certificados",
          routerLink: "",
          icon: faFileContract,
          permissions: ['SGC-Cadastrar_Contrato','SGC-Editar_Contrato', 'SGC-Visualizar_Contrato']
        } ,
        
        // menu: [
        //   {
        //     label: "Contratos",
        //     routerLink: "/home/contrato",
        //     icon: faFileContract,
        //     permissions: ['SGC-Cadastrar_Contrato','SGC-Editar_Contrato', 'SGC-Visualizar_Contrato']
        //   } ,
  




      ]
      
    } ,
    
  ]
  public isLoggedIn: boolean = false;

  constructor(public modalService: NgbModal, private readonly keycloak: KeycloakService) {

  }

  ngOnInit(){

  }


  export(modalService: NgbModal) {
    modalService.open(ModalXmlComponent);
  }

  opened = false;
}

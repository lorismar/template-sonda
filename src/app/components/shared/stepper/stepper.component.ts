import { Component, Input, OnInit } from '@angular/core';
import { activeStepperCss } from '../../contrato/dados-basico/dados-basico.component';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { CadastroContratosService } from 'src/app/services/contratos/cadastro-constratos.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
})

export class StepperComponent implements OnInit {  
  @Input() paginaAnterior = '';
  @Input() paginaAtual = '';
  @Input() dadosBasicos: any;
  @Input() garantias: any;
  @Input() quadroDemonstrativo: any;
  @Input() datasPrazos: any;
  @Input() empenhos: any;
  @Input() gestores: any;
  @Input() arquivos: any;
  @Input() finalizarContrato: any;
  public idContrato: any;
  public url_atual = window.location.pathname;

  constructor(
    public formService: CadastroContratosService,
    private router: Router, 
    activatedRoute: ActivatedRoute) { 
        this.idContrato = activatedRoute.snapshot.params['idContrato'];
        if(!this.idContrato) this.idContrato = '';
  }

  ngOnInit(): void {
    if(this.idContrato && this.idContrato != this.formService.getForm('dadosBasicos').value.idContrato) {
      this.formService.clearForms();
      this.formService.getContratoById(this.idContrato);
    }
  }

  getLink(idLink: any) {
    switch (idLink) {
      case 1: {
        return this.router.navigate(['/home/contrato/dados-basicos/', this.idContrato]);
      }
      case 2: {
        return  this.router.navigate(['/home/contrato/datas-prazos/', this.idContrato]);
      }
      case 3: {
        return  this.router.navigate(['/home/contrato/gestores/', this.idContrato]);
      }
      case 4: {
        return  this.router.navigate(['/home/contrato/quadro-demonstrativo/', this.idContrato]);
      }
      case 5: {
        return  this.router.navigate(['/home/contrato/garantias/', this.idContrato]);
      }
      case 6: {
        return  this.router.navigate(['/home/contrato/empenho/', this.idContrato]);
      }
      case 7: {
        return  this.router.navigate(['/home/contrato/finalizar-contrato/', this.idContrato]);
      }
      default: {
        return 0
        break;
      }
    }
  }

  getAtual() {
    let regex = /\/home\/contrato\/([^\/]*)/;
    const match = regex.exec(this.url_atual)
    const url = match ? match[1] : '';
    switch (url) {
      case 'novo': {
        return 1
      }
      case 'dados-basicos': {
        return 1
      }
      case 'editar': {
        return 1
      }
      case 'datas-prazos': {
        return 2
      }
      case 'gestores': {
        return 3
      }
      case 'quadro-demonstrativo': {
        return 4
      }
      case 'garantias': {
        return 5
      }
      case 'empenho': {
        return 6
      }
      case 'finalizar-contrato': {
        return 7
      }
      case 'visualizar': {
        return 7
      }
      default: {
        return 0
        break;
      }
    }
  }

  activeStepperCss = activeStepperCss;



}

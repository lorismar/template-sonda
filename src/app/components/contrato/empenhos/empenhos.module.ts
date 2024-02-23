import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpenhosRoutingModule } from './empenhos-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { EmpenhosComponent } from './empenhos.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import {NavegacaoModule} from "../../shared/navegacao/navegacao.module";
import { StepperModule } from '../../shared/stepper/stepper.module';
import { ModalEmpenhosComponent } from './modal-empenhos/modal-empenhos.component';
import { CadastroEmpenhoNovoComponent } from './cadastro-empenho-novo/cadastro-empenho-novo.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMaskDirective } from 'ngx-mask';

@NgModule({
  declarations: [EmpenhosComponent, ModalEmpenhosComponent, CadastroEmpenhoNovoComponent],
  imports: [
    CommonModule,
    EmpenhosRoutingModule,
    FontAwesomeModule,
    FormsModule,
    MatInputModule,
    MatTooltipModule,
    CurrencyMaskModule,
    NavegacaoModule,
    StepperModule,
    ReactiveFormsModule,
    SharedModule,
    NgxMaskDirective
  ],
  providers: [],
  exports: [EmpenhosComponent],
})
export class EmpenhosModule {}

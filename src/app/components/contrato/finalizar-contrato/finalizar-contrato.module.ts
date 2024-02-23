import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinalizarContratoRouting } from './finalizar-contrato.routing.module';
import { StepperModule } from '../../../components/shared/stepper/stepper.module';
import { NavegacaoModule } from '../../../components/shared/navegacao/navegacao.module';
import { FinalizarContratoComponent } from './finalizar-contrato.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMaskDirective, NgxMaskPipe, NgxMaskService, provideEnvironmentNgxMask } from 'ngx-mask';
import { CurrencyMaskModule } from 'ng2-currency-mask';



@NgModule({
  declarations: [FinalizarContratoComponent],
  imports: [
    CommonModule,
    FormsModule,
    FinalizarContratoRouting,
    StepperModule,
    NavegacaoModule,
    SharedModule,
    NgxMaskPipe,
    NgxMaskDirective,
    CurrencyMaskModule
  ],
  providers: [
    provideEnvironmentNgxMask()
  ]
})
export class FinalizarContratoModule { }


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DadosBasicosComponent } from './dados-basico.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { DadosBasicosRouting } from './dados-basico.routing.module';
import {NavegacaoModule} from "../../../components/shared/navegacao/navegacao.module";
import { StepperModule } from '../../../components/shared/stepper/stepper.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMaskDirective } from 'ngx-mask';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
  
};
@NgModule({
  declarations: [DadosBasicosComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    CurrencyMaskModule,
    DadosBasicosRouting,
    NavegacaoModule,
    StepperModule,
    ReactiveFormsModule,
    SharedModule,
    NgxMaskDirective
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
],
  exports: [DadosBasicosComponent],
})
export class DadosBasicosModule {}

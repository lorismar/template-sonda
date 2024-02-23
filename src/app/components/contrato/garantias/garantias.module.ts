
import { GarantiasComponent } from './garantias.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { GarantiasRouting } from './garantias.routing.module';
import {NavegacaoModule} from "../../../components/shared/navegacao/navegacao.module";
import { StepperModule } from '../../../components/shared/stepper/stepper.module';


@NgModule({
  declarations: [GarantiasComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    GarantiasRouting,
    NavegacaoModule,
    StepperModule
  ],
  exports: [GarantiasComponent],
})
export class GarantiasModule {}

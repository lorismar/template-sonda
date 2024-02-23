
import { DatasPrazosRouting } from './datas-prazos.routing.module';
import { DatasPrazosComponent } from './datas-prazos.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { MatFormFieldModule } from '@angular/material/form-field';
import {NavegacaoModule} from "../../../components/shared/navegacao/navegacao.module";
import { StepperModule } from '../../../components/shared/stepper/stepper.module';

@NgModule({
  declarations: [DatasPrazosComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DatasPrazosRouting,
    CurrencyMaskModule,
    MatFormFieldModule,
    NavegacaoModule,
    StepperModule,
  ],
})
export class DatasPrazosModule {}

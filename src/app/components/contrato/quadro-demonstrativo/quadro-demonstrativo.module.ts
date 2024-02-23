import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuadroDemonstrativoRoutingModule } from './quadro-demonstrativo-routing.module';
import { QuadroDemonstrativoComponent } from './quadro-demonstrativo.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StepperComponent } from '../../../components/shared/stepper/stepper.component';
import {NavegacaoModule} from "../../../components/shared/navegacao/navegacao.module";
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { StepperModule } from '../../../components/shared/stepper/stepper.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
  declarations: [QuadroDemonstrativoComponent],
  imports: [
    CommonModule,
    QuadroDemonstrativoRoutingModule,
    FontAwesomeModule,
    CurrencyMaskModule,
    FormsModule,
    NavegacaoModule,
    NgxCsvParserModule,
    StepperModule
  ],
  exports: [],
})
export class QuadroDemonstrativoModule {}

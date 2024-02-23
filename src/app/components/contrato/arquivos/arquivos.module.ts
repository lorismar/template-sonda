import { MegabytesPipe } from '../../../components/shared/convertToMB/convertToMB-pipe';
import { ArquivosComponent } from './arquivos.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ArquivosRouting } from './arquivos.routing.module';
import {NavegacaoModule} from "../../../components/shared/navegacao/navegacao.module";
import { StepperModule } from '../../../components/shared/stepper/stepper.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ArquivosComponent, MegabytesPipe],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    CurrencyMaskModule,
    ArquivosRouting,
    NavegacaoModule,
    StepperModule,
    SharedModule
  ],
  exports: [ArquivosComponent],
})
export class ArquivosModule {}

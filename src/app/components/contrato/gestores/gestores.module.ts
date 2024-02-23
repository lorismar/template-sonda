import { SearchFilterPipe } from '../../../_helpers/custom-filter-pipe.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GestoresRoutingModule } from './gestores-routing.module';
import { GestoresComponent } from './gestores.component';
import { NavegacaoModule } from "../../../components/shared/navegacao/navegacao.module";
import { StepperModule } from '../../../components/shared/stepper/stepper.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [GestoresComponent, SearchFilterPipe],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    GestoresRoutingModule,
    NavegacaoModule,
    StepperModule,
    SharedModule
  ],
  providers: [SearchFilterPipe]
})

export class GestoresModule { }

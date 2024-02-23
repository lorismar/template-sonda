import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermoAditivoRoutingModule } from './termo-aditivo-routing.module';
import { TermoAditivoComponent } from './termo-aditivo.component';
import { ModalContratoComponent } from 'src/app/components/termo-aditivo/modal-contrato/modal-contrato.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavegacaoModule } from 'src/app/components/shared/navegacao/navegacao.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ListaTAComponent } from 'src/app/components/termo-aditivo/lista-ta/lista-ta.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
@NgModule({
  declarations: [
    TermoAditivoComponent,
    ModalContratoComponent,
    ListaTAComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatTooltipModule,
    TermoAditivoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FontAwesomeModule,
    NavegacaoModule,
    CurrencyMaskModule,
    NgxPaginationModule,
    NgbModalModule,
    NgbModule
  ],
  exports: [
    TermoAditivoComponent,
    ModalContratoComponent
    
  ]
})
export class TermoAditivoModule { }

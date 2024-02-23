import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListaContratosComponent } from './lista-contratos.component';
import { listaContratosRoutingModule } from './lista-contratos.routing.module';
import { NavegacaoModule } from '../../shared/navegacao/navegacao.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ModalTaComponent } from './modal-ta/modal-ta.component';
import { ModalApComponent } from './modal-ap/modal-ap.component';
import { HasPermissionDirective } from 'src/app/shared/directives/has-permission.directive';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    listaContratosRoutingModule,
    NavegacaoModule,
    NgxPaginationModule,
    CurrencyMaskModule,
    SharedModule
  ],
  declarations: [ListaContratosComponent, ModalTaComponent, ModalApComponent],
  exports: [ListaContratosComponent],
})
export class ListaContratosModule {}

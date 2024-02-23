import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndiceCorrecaoRoutingModule } from './indice-correcao-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavegacaoModule } from 'src/app/components/shared/navegacao/navegacao.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListaIcComponent } from 'src/app/components/indice-correcao/lista-ic/lista-ic.component';
import { CadastroIcComponent } from 'src/app/components/indice-correcao/cadastro-ic/cadastro-ic.component';


@NgModule({
  declarations: [ListaIcComponent, CadastroIcComponent],
  imports: [
    CommonModule,
    IndiceCorrecaoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FontAwesomeModule,
    NavegacaoModule,
    CurrencyMaskModule,
    NgxPaginationModule,
    NgbModalModule,
    NgbModule
  ]
})
export class IndiceCorrecaoModule { }

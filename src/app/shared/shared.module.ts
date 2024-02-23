import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { NavegacaoModule } from '../components/shared/navegacao/navegacao.module';
import { NavegacaoComponent } from '../components/shared/navegacao/navegacao.component';
import { AutcompleteComponent } from './components/autcomplete/autcomplete.component';
import { ModalFornecedoresComponent } from './components/modal-fornecedores/modal-fornecedores.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgxMaskDirective, NgxMaskPipe, NgxMaskService } from 'ngx-mask';
import { ModalSelectComponent } from './components/modal-select/modal-select.component';
import { HasPermissionDirective } from './directives/has-permission.directive';
import { LoadingComponent } from './components/loading/loading.component';
import { NotificacoesComponent } from './components/notificacoes/notificacoes.component';
import { ActionsComponent } from './components/actions/actions.component';
import { ModalContratoComponent } from './components/modal-contrato/modal-contrato.component';
import { ModalLinkArquivoComponent } from './components/modal-link-arquivo/modal-link-arquivo.component';

@NgModule({
  declarations: [
    HeaderComponent, 
    SidenavComponent, 
    FooterComponent, 
    ConfirmationDialogComponent, 
    AutcompleteComponent, 
    ModalFornecedoresComponent, 
    ModalSelectComponent, 
    HasPermissionDirective, 
    LoadingComponent, 
    NotificacoesComponent, 
    ActionsComponent,
    ModalContratoComponent,
    ModalLinkArquivoComponent],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    NavegacaoModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NavegacaoModule,
    CurrencyMaskModule,
    NgxPaginationModule,
    NgxMaskDirective, 
    NgxMaskPipe

  ],
  exports: [HeaderComponent, SidenavComponent, FooterComponent, ConfirmationDialogComponent, NavegacaoComponent, HasPermissionDirective, LoadingComponent, ActionsComponent, ModalContratoComponent],
})
export class SharedModule {}

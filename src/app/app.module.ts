import { HomeComponent } from './views/home/home.component';
import {
  APP_INITIALIZER,
  DEFAULT_CURRENCY_CODE,
  LOCALE_ID,
  NgModule,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './services/auth/auth.service';
import { TokenInterceptor } from './services/interceptors/token.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskDirective, NgxMaskPipe, NgxMaskService, provideEnvironmentNgxMask } from 'ngx-mask';
import { ErrorInterceptor } from './_helpers/err.interceptor';
import { NgxPaginationModule } from 'ngx-pagination';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { AppConfigService } from './providers/app-config.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemQuadroComponent } from './components/contrato/quadro-demonstrativo/item-quadro/item-quadro.component';
import { NavegacaoModule } from './components/shared/navegacao/navegacao.module';
import { CURRENCY_MASK_CONFIG, CurrencyMaskConfig, CurrencyMaskModule } from 'ng2-currency-mask';
import { ModalXmlComponent } from './components/apostilamento/modal-xml/modal-xml.component';
import { IndiceCorrecaoComponent } from './views/indice-correcao/indice-correcao.component';


import { ModalOfComponent } from './components/ordem-fornecimento/modal-of/modal-of.component';
import { ModalItemOFComponent } from './components/ordem-fornecimento/modal-item-of/modal-item-of.component';

import { ModalProcessoComponent } from './components/ordem-fornecimento/modal-processo/modal-processo.component';


import { ModalRazaoSocialComponent } from './components/termo-aditivo/modal-razao-social/modal-razao-social.component';
import { ModalValorContratualComponent } from './components/termo-aditivo/modal-valor-contratual/modal-valor-contratual.component';
import { ModalOutrosComponent } from './components/termo-aditivo/modal-outros/modal-outros.component';
import { ModalSuspensaoComponent } from './components/termo-aditivo/modal-suspensao/modal-suspensao.component';
import { ModalPrazoVigenciaComponent } from './components/termo-aditivo/modal-prazo-vigencia/modal-prazo-vigencia.component';
import { ModalReajusteComponent } from './components/termo-aditivo/modal-reajuste/modal-reajuste.component';
import { ModalQuadroDemonstrativoComponent } from './components/termo-aditivo/modal-quadro-demonstrativo/modal-quadro-demonstrativo.component';
import { ModalQuadroSupressaoComponent } from './components/termo-aditivo/modal-quadro-supressao/modal-quadro-supressao.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { ModalTrdComponent } from './components/termo-definitivo/modal-trd/modal-trd.component';
import { ModalNfComponent } from './components/termo-definitivo/modal-nf/modal-nf.component';
import { ArquivosComponent } from './views/arquivos/arquivos.component';
import { ModalContratoArquivoComponent } from './components/arquivos/modal-contrato-arquivo/modal-contrato-arquivo.component';
import { ModalArquivoComponent } from './components/arquivos/modal-arquivo/modal-arquivo.component';
import { ErroMaterialComponent } from './components/apostilamento/erro-material/erro-material.component';
import { ModalErroMaterialComponent } from './components/apostilamento/modal-erro-material/modal-erro-material.component';
import { ModalGestoresComponent } from './components/apostilamento/modal-gestores/modal-gestores.component';
import { ModalLinkArquivoComponent } from './shared/components/modal-link-arquivo/modal-link-arquivo.component';
import { ModalVisualizarGestoresComponent } from './components/apostilamento/modal-visualizar-gestores/modal-visualizar-gestores.component';
import { ModalReequilibrioComponent } from './components/termo-aditivo/modal-reequilibrio/modal-reequilibrio.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ModalDocumentoComponent } from './components/ordem-fornecimento/modal-documento/modal-documento.component';
import { initializer } from './services/keycloak/keycloak.service';
import { KeycloakConfigService } from './services/keycloak/keycloak-config.service';
registerLocaleData(localePt, 'pt');
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
  declarations: [
    AppComponent, 
    HomeComponent, 
    ItemQuadroComponent, 
    
    ModalXmlComponent, 
    IndiceCorrecaoComponent, 
    
    ModalOfComponent, 
    ModalItemOFComponent, 
    
    ModalProcessoComponent, 
   
    
    ModalRazaoSocialComponent,
     ModalValorContratualComponent, 
     ModalOutrosComponent, 
     ModalSuspensaoComponent, 
     ModalPrazoVigenciaComponent, 
     ModalReajusteComponent, 
     ModalQuadroDemonstrativoComponent, 
     ModalQuadroSupressaoComponent, 
      
     ModalTrdComponent, 
     ModalNfComponent, 
     ArquivosComponent, 
     ModalContratoArquivoComponent, 
     ModalArquivoComponent,
     ErroMaterialComponent,
     ModalErroMaterialComponent,
     ModalGestoresComponent,
     ModalVisualizarGestoresComponent,
     ModalReequilibrioComponent,
     PageNotFoundComponent,
     ModalDocumentoComponent,
    
    ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 5000,
    }),
    HttpClientModule,
    NgxPaginationModule,
    AppRoutingModule,
    SharedModule,
    FontAwesomeModule,
    NavegacaoModule,
    CurrencyMaskModule,
    NgbModule,
    NgxMaskDirective, 
    NgxMaskPipe,
    KeycloakAngularModule
  ],
  providers: [
    AuthService,
    JwtHelperService,
    provideEnvironmentNgxMask(),
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [AppConfigService],
      multi: true,
    },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService, KeycloakConfigService],
    },
  ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
export function initConfig(appConfig: AppConfigService) {
  return () => appConfig.loadConfig();
}


import { DadosBasicosModule } from '../../components/contrato/dados-basico/dados-basico.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BotaoNextPreviuosModule } from '../../components/shared/botao-next-previuos/botao-next-previuos.module';
import { ContratoComponent } from './contrato.component';
import { CadastroContratosRoutingModule } from './contrato.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinalizarContratoModule } from '../../components/contrato/finalizar-contrato/finalizar-contrato.module';

@NgModule({
  declarations: [ContratoComponent],
  imports: [
    CommonModule,
    CadastroContratosRoutingModule,
    BotaoNextPreviuosModule,
    DadosBasicosModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ]

})
export class CadastroContratosModule { }

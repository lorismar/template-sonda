import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinalizarContratoComponent } from './finalizar-contrato.component';

const routes: Routes = [
  {
    path: ':idContrato',
    component: FinalizarContratoComponent,
  },
  {
    path: '',
    component: FinalizarContratoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinalizarContratoRouting{}

import { DadosBasicosComponent } from './dados-basico.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: ':idContrato',
    component: DadosBasicosComponent,
  },
  {
    path: '',
    component: DadosBasicosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DadosBasicosRouting {}

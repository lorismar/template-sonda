import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpenhosComponent } from './empenhos.component';

const routes: Routes = [
  {
    path: ':idContrato',
    component: EmpenhosComponent,
  },
  {
    path: '',
    component: EmpenhosComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpenhosRoutingModule {}

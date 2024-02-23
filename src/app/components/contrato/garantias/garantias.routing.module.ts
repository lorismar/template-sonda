import { GarantiasComponent } from './garantias.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: ':idContrato',
    component: GarantiasComponent,
  },
  {
    path: '',
    component: GarantiasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GarantiasRouting {}

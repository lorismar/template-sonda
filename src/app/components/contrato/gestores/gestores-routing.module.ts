import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestoresComponent } from './gestores.component';

const routes: Routes = [
  {
    path: ':idContrato',
    component: GestoresComponent,
  },
  {
    path: '',
    component: GestoresComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestoresRoutingModule {}

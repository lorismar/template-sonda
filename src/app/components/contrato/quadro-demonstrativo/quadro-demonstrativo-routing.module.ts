import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuadroDemonstrativoComponent } from './quadro-demonstrativo.component';

const routes: Routes = [
  {
    path: ':idContrato',
    component: QuadroDemonstrativoComponent,
  },
  {
    path: '',
    component: QuadroDemonstrativoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuadroDemonstrativoRoutingModule {}

import { DatasPrazosComponent } from './datas-prazos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: ':idContrato',
    component: DatasPrazosComponent,
  },
  {
    path: '',
    component: DatasPrazosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatasPrazosRouting{}

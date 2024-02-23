import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermoAditivoComponent } from './termo-aditivo.component';
import { ListaTAComponent } from 'src/app/components/termo-aditivo/lista-ta/lista-ta.component';

const routes: Routes = [
  {
    path: '',
    component: TermoAditivoComponent
  },
  { path: ':idTermoAditivo', component: TermoAditivoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermoAditivoRoutingModule { }

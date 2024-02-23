import { ArquivosComponent } from './arquivos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: ':idContrato',
    component: ArquivosComponent,
  },
  {
    path: '',
    component: ArquivosComponent,
  },
  {
    path: 'download/:idArquivo',
    component: ArquivosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArquivosRouting{}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroIcComponent } from 'src/app/components/indice-correcao/cadastro-ic/cadastro-ic.component';
import { ListaIcComponent } from 'src/app/components/indice-correcao/lista-ic/lista-ic.component';
import { IndiceCorrecaoComponent } from './indice-correcao.component';

const routes: Routes = [
  {
    path: '',
    component: IndiceCorrecaoComponent,
    children:[
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'lista'
      },
      {
        path: 'lista',
        component: ListaIcComponent,
      },
      {
        path: 'cadastro',
        component: CadastroIcComponent,
      },
      {
        path: 'editar/:idIndice',
        component: CadastroIcComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndiceCorrecaoRoutingModule { }

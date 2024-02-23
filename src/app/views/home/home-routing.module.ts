import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { RoleGuard } from 'src/app/_helpers/role.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children:[
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'meus-contratos'
      },
      {
        path: 'contrato',
        loadChildren: () => import('../contrato/contrato.module').then(m => m.CadastroContratosModule),
        canActivate: [RoleGuard],
        data: { expectRoles: ['SGC-Visualizar_Contrato']}
      },

  
     
     
]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }

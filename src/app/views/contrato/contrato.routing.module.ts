import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '',
  },
  {
    path: 'lista',
    loadChildren: () =>
      import('../../components/contrato/lista-contratos/lista-contratos.module').then(
        (m) => m.ListaContratosModule
      ),
        
  },
 
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroContratosRoutingModule {}
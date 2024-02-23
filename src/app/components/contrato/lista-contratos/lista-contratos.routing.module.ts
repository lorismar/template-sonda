import { AuthGuard } from '../../../_helpers/auth.guard';
import { ListaContratosComponent } from './lista-contratos.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FinalizarContratoComponent } from '../../contrato/finalizar-contrato/finalizar-contrato.component';
import { Role } from 'src/app/_helpers/_models/role';

export const listaContratos: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ListaContratosComponent,
  },
  {
    path: 'visualizar/:idContrato',
    component: FinalizarContratoComponent,
  },
]

  @NgModule({
    imports: [RouterModule.forChild(listaContratos)],
    exports: [RouterModule],
  })
  export class listaContratosRoutingModule {}
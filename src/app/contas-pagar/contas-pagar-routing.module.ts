import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContasPagarFormComponent } from './contas-pagar-form/contas-pagar-form.component';
import { ContasPagasTableComponent } from './contas-pagas-table/contas-pagas-table.component';
import { ContasPagarComponent } from './contas-pagar.component';

const routes: Routes = [
  { path: 'lista', component: ContasPagarComponent },
  { path: 'nova', component: ContasPagarFormComponent },
  { path: 'pagas', component: ContasPagasTableComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContasPagarRoutingModule { }

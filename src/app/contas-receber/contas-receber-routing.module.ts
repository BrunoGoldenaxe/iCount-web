import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContasReceberComponent } from './contas-receber.component';
import { ContasReceberFormComponent } from './contas-receber-form/contas-receber-form.component';
import { ContasRecebidasTableComponent } from './contas-recebidas-table/contas-recebidas-table.component';

const routes: Routes = [
  { path: 'lista', component: ContasReceberComponent },
  { path: 'nova', component: ContasReceberFormComponent },
  { path: 'recebidas', component: ContasRecebidasTableComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContasReceberRoutingModule { }

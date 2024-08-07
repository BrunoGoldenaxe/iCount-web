import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { ContasPagarFormComponent } from './contas-pagar-form/contas-pagar-form.component';
import { ContasPagarRoutingModule } from './contas-pagar-routing.module';
import { ContasPagarTableComponent } from './contas-pagar-table/contas-pagar-table.component';
import { ContasPagarComponent } from './contas-pagar.component';
import { ContasPagasTableComponent } from './contas-pagas-table/contas-pagas-table.component';


@NgModule({
  declarations: [
    ContasPagarTableComponent,
    ContasPagarFormComponent,
    ContasPagasTableComponent,
    ContasPagarComponent,
  ],
  imports: [
    CommonModule,
    ContasPagarRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class ContasPagarModule { }

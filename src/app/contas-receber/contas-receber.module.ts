import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContasReceberRoutingModule } from './contas-receber-routing.module';
import { ContasReceberComponent } from './contas-receber.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { ContasReceberFormComponent } from './contas-receber-form/contas-receber-form.component';
import { ContasReceberTableComponent } from './contas-receber-table/contas-receber-table.component';
import { ContasRecebidasTableComponent } from './contas-recebidas-table/contas-recebidas-table.component';


@NgModule({
  declarations: [
    ContasReceberComponent,
    ContasReceberFormComponent,
    ContasReceberTableComponent,
    ContasRecebidasTableComponent
  ],
  imports: [
    CommonModule,
    ContasReceberRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class ContasReceberModule { }

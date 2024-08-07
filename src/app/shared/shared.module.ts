import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSnackBarMessageComponent } from './app-snack-bar/app-snack-bar-message.component';
import { AppMaterialModule } from './app-material/app-material.module';


@NgModule({
  declarations: [
    AppSnackBarMessageComponent,

  ],
  imports: [
    CommonModule,
    AppMaterialModule,


  ],
  exports: [
    AppSnackBarMessageComponent,

  ]
})
export class SharedModule { }

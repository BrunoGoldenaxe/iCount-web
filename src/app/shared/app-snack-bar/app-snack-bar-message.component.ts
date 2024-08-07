import { Component, Inject, inject, NgModule, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar-message',
  templateUrl: 'app-snack-bar-message.component.html',
  styleUrls: ['./app-snack-bar-message.component.scss']
})
export class AppSnackBarMessageComponent implements OnInit{
  snackBarRef = inject(MatSnackBarRef);
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {}

  ngOnInit(): void {

  }
}

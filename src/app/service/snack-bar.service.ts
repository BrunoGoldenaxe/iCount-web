import { Injectable } from "@angular/core";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class SnackBarService {
  constructor(private matSnackbar: MatSnackBar) {}

  /**
   * Mostra um SnackBar usando Angular Material Design
   * @param message mensagem a ser exibida
   * @param panelClass Classe CSS a ser aplicada ao Snack Bar
   * @param duration duração do SnackBar em ms. Padrão: 3000
   * @param horizontalPosition posição horizontal do SnackBar
   * @param verticalPosition posição vertical do SnackBar
   */
  presentMatSnackbar(
    message: string,
    panelClass: "success" | "danger" | "warning" | "info" = "success" as any,
    duration: number = 6000,
    horizontalPosition: MatSnackBarHorizontalPosition = "right",
    verticalPosition: MatSnackBarVerticalPosition = "top",
    action: string = "OK"
  ) {
    return this.matSnackbar.open(message, action, {
      duration,
      horizontalPosition,
      verticalPosition,
      panelClass,
    });
  }
}

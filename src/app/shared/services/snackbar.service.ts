import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  showSuccess(){
    this.snackBar.open('Completed with success.', 'close', { duration: 2000, panelClass: 'successSnack' });
  }

  showError(error: string){
    this.snackBar.open(error, 'close', { duration: 2000, panelClass: 'errorSnack' });
  }
}

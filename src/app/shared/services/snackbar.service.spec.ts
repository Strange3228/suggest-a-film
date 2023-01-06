import { TestBed } from '@angular/core/testing';

import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { SnackbarService } from './snackbar.service';

describe('SnackbarService', () => {
  let service: SnackbarService;
  let snackbar: MatSnackBar

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule
      ]
    });
    service = TestBed.inject(SnackbarService);
    snackbar = TestBed.inject(MatSnackBar)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open snack bar on success', () => {
    spyOn(snackbar,'open')
    service.showSuccess()
    expect(snackbar.open).toHaveBeenCalled()
  })

  it('should open snack bar on error', () => {
    spyOn(snackbar,'open')
    service.showError('error')
    expect(snackbar.open).toHaveBeenCalled()
  })
});

import { MatSnackBar } from "@angular/material/snack-bar";

export interface ShowSnackbarParameters {
  message: string;
  type: "error" | "success";
}

export function initSnackBar(snackBar: MatSnackBar) {
  return ({ message, type }: ShowSnackbarParameters) => {
    snackBar.open(message, "close", {
      duration: 3000,
      verticalPosition: "top",
      panelClass: ["snackbar", `snackbar-${type}`],
    });
  };
}

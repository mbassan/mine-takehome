import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Recipe } from "../models/recipe.interface";
import { DatabaseService } from "../services/db.service";
import {
  ShowSnackbarParameters,
  initSnackBar,
  timestampToDateString,
} from "../util";

const ADD_TO_FAVORITES_MESSAGE = "The recipe has been added to your favorites.";
const REMOVE_FROM_FAVORITES_MESSAGE =
  "The recipe has been removed from your favorites.";

@Component({
  selector: "app-recipe-details",
  templateUrl: "./recipe-details.component.html",
  styleUrls: ["./recipe-details.component.scss"],
})
export class RecipeDetailsComponent implements OnChanges {
  @ViewChild("recipeComponentContainer", { read: ViewContainerRef })
  recipeComponentContainer!: ViewContainerRef;

  @Input() recipe!: Recipe;

  @Output() closeEvent = new EventEmitter<void>();

  @Output() editEvent = new EventEmitter<void>();

  @Output() refreshEvent = new EventEmitter<void>();

  databaseService: DatabaseService;

  showSnackBar!: (params: ShowSnackbarParameters) => void;

  constructor(databaseService: DatabaseService, snackBar: MatSnackBar) {
    this.databaseService = databaseService;
    this.showSnackBar = initSnackBar(snackBar);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.recipeComponentContainer) {
      this.recipe = changes["recipe"].currentValue;
    }
  }

  addToFavorites(): void {
    this.databaseService
      .updateRecipe(this.recipe.id, {
        ...this.recipe,
        favorite: !this.recipe.favorite,
      })
      .subscribe((error) =>
        this.notifyUpdate(
          this.recipe.favorite
            ? ADD_TO_FAVORITES_MESSAGE
            : REMOVE_FROM_FAVORITES_MESSAGE,
          error
        )
      );
  }

  editRecipe(): void {
    this.editEvent.emit();
  }

  refreshRecipes(): void {
    this.refreshEvent.emit();
  }

  formatDate(timestamp: number): string {
    return timestampToDateString(timestamp);
  }

  close(): void {
    this.closeEvent.emit();
  }

  notifyUpdate(message: string, error: string | void) {
    if (error) {
      this.showSnackBar({
        message: error,
        type: "error",
      });
    } else {
      this.showSnackBar({
        message,
        type: "success",
      });
      this.close();
      this.refreshRecipes();
    }
  }
}

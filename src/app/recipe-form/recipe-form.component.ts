import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
} from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Recipe } from "../models/recipe.interface";
import { CookingEnum } from "../models/cooking.enum";
import { DatabaseService } from "../services/db.service";
import { ShowSnackbarParameters, initSnackBar } from "../util";
import { validateRecipeForm, ErrorsByField } from "./validations";

const RECIPE_DEFAULT_VALUE: Recipe = {
  id: "",
  name: "",
  style: CookingEnum.Baking,
  author: "",
  time: 120,
  instructions: [],
  ingredients: [],
  notes: "",
  created: 1715027306000,
  image:
    "https://www.spoonforkbacon.com/wp-content/uploads/2021/03/best-pasta-recipes-roundup.jpg",
  favorite: true,
};

const UPDATE_SUCCESS_MESSAGE = "The recipe has been saved successfully.";
const DELETE_SUCCESS_MESSAGE = "The recipe has been deleted successfully.";

function editOrDefault(recipe?: Recipe) {
  if (recipe) {
    return { ...recipe };
  }
  return { ...RECIPE_DEFAULT_VALUE, created: Date.now() };
}

@Component({
  selector: "app-recipe-form",
  templateUrl: "./recipe-form.component.html",
  styleUrls: ["./recipe-form.component.scss"],
})
export class RecipeFormComponent implements OnChanges {
  @Input() recipe?: Recipe;

  @Output() closeEvent = new EventEmitter<void>();

  @Output() refreshEvent = new EventEmitter<void>();

  recipeForm!: Recipe;

  isEditing: boolean = false;

  styleOptions = Object.values(CookingEnum);

  databaseService!: DatabaseService;

  showSnackBar!: (params: ShowSnackbarParameters) => void;

  errors: ErrorsByField = {};

  constructor(databaseService: DatabaseService, snackBar: MatSnackBar) {
    this.databaseService = databaseService;
    this.showSnackBar = initSnackBar(snackBar);
  }

  ngOnChanges(): void {
    this.recipeForm = editOrDefault(this.recipe);
    this.isEditing = !!this.recipe;
  }

  addToArrayProperty(
    key: keyof Pick<Recipe, "ingredients" | "instructions">
  ): void {
    this.recipeForm[key] = [...this.recipeForm[key], ""];
  }

  deleteFromArrayProperty(
    key: keyof Pick<Recipe, "ingredients" | "instructions">,
    indexToRemove: number
  ): void {
    this.recipeForm[key] = this.recipeForm[key].filter(
      (_, index) => index !== indexToRemove
    );
  }

  saveRecipe() {
    const errorsByField = validateRecipeForm(this.recipeForm);
    if (Object.keys(errorsByField).length > 0) {
      this.errors = errorsByField;
      return;
    }
    if (this.isEditing) {
      this.databaseService
        .updateRecipe(this.recipeForm.id, this.recipeForm)
        .subscribe((error) => this.notifyUpdate(UPDATE_SUCCESS_MESSAGE, error));
    } else {
      this.databaseService
        .addRecipe(this.recipeForm)
        .subscribe((error) => this.notifyUpdate(UPDATE_SUCCESS_MESSAGE, error));
    }
  }

  deleteRecipe() {
    this.databaseService
      .deleteRecipe(this.recipeForm.id)
      .subscribe((error) => this.notifyUpdate(DELETE_SUCCESS_MESSAGE, error));
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

  close(): void {
    this.closeEvent.emit();
  }

  refreshRecipes(): void {
    this.refreshEvent.emit();
  }

  trackByFn(index: number) {
    return index;
  }
}

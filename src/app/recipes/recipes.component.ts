import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { Component, HostListener, ViewChild } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { FormControl } from "@angular/forms";

import { Recipe } from "../models/recipe.interface";
import { DatabaseService } from "../services/db.service";
import { recipeMapper } from "../services/mappers";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.component.html",
  styleUrls: ["./recipes.component.scss"],
  animations: [
    trigger("recipes", [
      transition("* => *", [
        query(
          ":enter",
          [
            style({ opacity: 0 }),
            stagger(10, [animate("200ms", style({ opacity: 1 }))]),
          ],
          { optional: true }
        ),
      ]),
    ]),
    trigger("fadeInOut", [
      transition("* => *", [
        query(
          ":leave",
          [stagger(200, [animate("200ms", style({ opacity: 0 }))])],
          { optional: true }
        ),
        query(
          ":enter",
          [
            style({ opacity: 0 }),
            stagger(200, [animate("200ms", style({ opacity: 1 }))]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class RecipesComponent {
  selectedRecipe?: Recipe;

  recipes: Recipe[] = [];

  isEditing: boolean = false;

  filteredRecipes: Recipe[] = [];

  showOnlyFavoritesCtrl = new FormControl<boolean>(false);

  databaseService: DatabaseService;

  @ViewChild("sidenav") sidenav!: MatSidenav;

  @HostListener("document:keydown.escape", ["$event"]) onEscape() {
    this.closeSidenav();
  }

  constructor(databaseService: DatabaseService) {
    this.databaseService = databaseService;
  }

  ngOnInit(): void {
    this.fetchRecipes();
    this.showOnlyFavoritesCtrl.valueChanges.subscribe((showOnlyFavorites) => {
      this.filteredRecipes = showOnlyFavorites
        ? this.recipes.filter((recipe) => recipe.favorite)
        : this.recipes;
    });
  }
  trackById(_: number, recipe: Recipe) {
    return recipe.id;
  }

  fetchRecipes(): void {
    this.databaseService.getRecipes().subscribe((recipesRaw) => {
      const recipes = recipeMapper(recipesRaw);
      this.recipes = recipes;
      this.filteredRecipes = recipes;
    });
  }

  addRecipe(): void {
    this.selectedRecipe = undefined;
    this.isEditing = true;
    this.sidenav.open();
  }

  openRecipe(recipe: Recipe): void {
    this.selectedRecipe = recipe;
    this.isEditing = false;
    this.sidenav.open();
  }

  editRecipe() {
    this.isEditing = true;
  }

  closeSidenav() {
    this.sidenav.close();
    this.selectedRecipe = undefined;
  }

  refreshRecipes() {
    this.fetchRecipes();
  }
}

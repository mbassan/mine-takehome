import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { FormControl } from '@angular/forms';

import { Recipe } from '../models/recipe.interface';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  animations: [
    trigger('recipes', [
      transition('* => *', [ 
        query(':enter', [
            style({ opacity: 0 }),
            stagger(10, [animate('200ms', style({ opacity: 1 }))])
          ], { optional: true }
        )
      ])
    ]),
    trigger('fadeInOut', [
      transition('* => *', [
        query(':leave', [
          stagger(200, [
            animate('200ms', style({ opacity: 0 }))
          ])
        ], { optional: true }),
        query(':enter', [
          style({ opacity: 0 }),
          stagger(200, [
            animate('200ms', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class RecipesComponent {

  selectedRecipe?: Recipe;

  showOnlyFavoritesCtrl = new FormControl<boolean>(false);

  @ViewChild('sidenav') sidenav!: MatSidenav;

  @HostListener('document:keydown.escape', ['$event']) onEscape(event: KeyboardEvent) {
    this.sidenav.close();
  }

  trackByFn(index: number, recipe: Recipe) {

  }

  addRecipe(): void {
    this.selectedRecipe = undefined;
    this.sidenav.open();
  }

  openRecipe(recipe: Recipe): void {
    this.selectedRecipe = recipe;
    this.sidenav.open();
  }
}

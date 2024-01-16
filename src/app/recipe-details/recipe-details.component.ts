import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { Recipe } from '../models/recipe.interface';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnChanges, AfterViewInit {

  @ViewChild('recipeComponentContainer', { read: ViewContainerRef }) recipeComponentContainer!: ViewContainerRef;

  @Input() recipe?: Recipe;

  @Output() close = new EventEmitter<void>();
  
  ngOnChanges(changes: SimpleChanges): void {
    if (this.recipeComponentContainer) {
      this.loadRecipeComponent(changes['recipe']?.currentValue ? false : true);
    }
  }

  ngAfterViewInit(): void {
    this.loadRecipeComponent();
  }

  private loadRecipeComponent(edit: boolean = true): void {
    // TODO: Implement this function
  }
}

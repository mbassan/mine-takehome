import { Recipe, RecipeRaw } from "src/app/models/recipe.interface";
import { dateStringToTimestamp } from "src/app/util";

export function recipeMapper(recipesRaw: RecipeRaw[]): Recipe[] {
  return recipesRaw.map((recipeRaw) => {
    const created =
      recipeRaw.created ?? dateStringToTimestamp(recipeRaw.createdAt);
    const { createdAt, ...restOfProperties } = recipeRaw;
    return { ...restOfProperties, created };
  });
}

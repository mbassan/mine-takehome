import { Recipe } from "../models/recipe.interface";

export type ErrorsByField = Partial<Record<keyof Recipe, string>>;

const stringFields: (keyof Recipe)[] = ["name", "time", "style"];
const arrayFields: (keyof Recipe)[] = ["ingredients", "instructions"];

export function validateRecipeForm(recipeForm: Recipe) {
  const errorsByField: ErrorsByField = {};
  stringFields.forEach((field) => {
    if (!recipeForm[field] || recipeForm[field].toString().length === 0) {
      errorsByField[field] = `'${field}' is a required field.`;
    }
  });
  arrayFields.forEach((field) => {
    if (!recipeForm[field] || (recipeForm[field] as string[]).length === 0) {
      errorsByField[field] = `'${field}' must have at least one value.`;
    }
  });
  return errorsByField;
}

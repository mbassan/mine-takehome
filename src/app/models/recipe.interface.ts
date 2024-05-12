import { CookingEnum } from "./cooking.enum";

export interface Recipe {
  id: string; // document id
  name: string;
  ingredients: string[];
  style: CookingEnum;
  time: number; // time in minutes
  instructions: string[];
  author: string;
  created: number;
  image: string;
  favorite: boolean;
  notes: string;
}

export interface RecipeRaw extends Omit<Recipe, "created"> {
  created?: number;
  createdAt?: string;
}

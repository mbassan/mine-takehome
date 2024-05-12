import { Injectable, inject } from "@angular/core";
import { collectionData, Firestore } from "@angular/fire/firestore";
import {
  doc,
  deleteDoc,
  collection,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import {
  EMPTY,
  first,
  from,
  Observable,
  switchMap,
  tap,
  catchError,
} from "rxjs";

import { Recipe, RecipeRaw } from "../models/recipe.interface";

@Injectable({
  providedIn: "root",
})
export class DatabaseService {
  private firestore: Firestore = inject(Firestore);

  getRecipes(): Observable<RecipeRaw[]> {
    const recipes$ = collectionData(collection(this.firestore, "recipes"), {
      idField: "id",
    }) as Observable<RecipeRaw[]>;

    return recipes$.pipe(
      first(),
      tap((recipes) => console.log(`Recipes:`, recipes))
    );
  }

  addRecipe(recipe: Recipe): Observable<string | void> {
    if (!recipe) return EMPTY;

    return from(
      addDoc(collection(this.firestore, "recipes"), <Recipe>{ ...recipe })
    ).pipe(
      tap((docRef) => console.log(`Added a new recipe with ID: ${docRef.id}`)),
      switchMap((docRef) =>
        updateDoc(doc(this.firestore, "recipes", docRef.id), {
          ...recipe,
          id: docRef.id,
        })
      ),
      first(),
      catchError(() => {
        return "An error occurred when saving. Please try again later.";
      })
    );
  }

  updateRecipe(id: string, recipe: Recipe): Observable<string | void> {
    if (!recipe) return EMPTY;

    return from(
      updateDoc(doc(this.firestore, "recipes", id), { ...recipe })
    ).pipe(
      first(),
      tap(() => console.log(`Updated recipe with ID: ${id}`)),
      catchError(() => {
        return "An error occurred when saving. Please try again later.";
      })
    );
  }

  deleteRecipe(id: string): Observable<string | void> {
    if (!id) return EMPTY;

    return from(deleteDoc(doc(this.firestore, "recipes", id))).pipe(
      first(),
      tap(() => console.log(`Removed recipe with ID: ${id}`)),
      catchError(() => {
        return "An error occurred when deleting. Please try again later.";
      })
    );
  }
}

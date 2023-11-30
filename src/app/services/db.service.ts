import { Injectable, inject } from "@angular/core";
import { collectionData, Firestore } from "@angular/fire/firestore";
import { doc, deleteDoc, collection, CollectionReference, addDoc, updateDoc } from "firebase/firestore";
import { EMPTY, first, from, Observable, switchMap, tap } from "rxjs";

import { Recipe } from "../models/recipe.interface";

@Injectable({
    providedIn: "root",
})
export class DatabaseService {
    private firestore: Firestore = inject(Firestore);
    recipesCollection: CollectionReference;
    recipes$: Observable<Recipe[]>;
    
    constructor() {
        // get a reference to the recipes collection
        this.recipesCollection = collection(this.firestore, 'recipes');

        // get documents (data) from the collection using collectionData
        this.recipes$ = collectionData(this.recipesCollection, { idField: 'id' }) as Observable<Recipe[]>;
    }

    addRecipe(recipe: Recipe): Observable<void> {
        if (!recipe) return EMPTY;

        return from(addDoc(this.recipesCollection, <Recipe>{ ...recipe })).pipe(
            tap(docRef => console.log(`Added a new recipe with ID: ${docRef.id}`)),
            switchMap(docRef => updateDoc(doc(this.firestore, "recipes", docRef.id), { ... recipe, id: docRef.id })),
            first()
        );
    }

    updateRecipe(id: string, recipe: Recipe): Observable<void> {
        if (!recipe) return EMPTY;

        return from(updateDoc(doc(this.firestore, "recipes", id), { ... recipe })).pipe(
            first(),
            tap(() => console.log(`Updated recipe with ID: ${id}`))
        );
    }

    deleteRecipe(id: string): Observable<void> {
        if (!id) return EMPTY;

        return from(deleteDoc(doc(this.firestore, "recipes", id))).pipe(
            first(),
            tap(() => console.log(`Removed recipe with ID: ${id}`))
        );
    }
}
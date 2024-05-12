import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// Angular Material
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";

// Google Firebase
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// App Components
import { RecipesComponent } from "./recipes/recipes.component";
import { RecipeCardComponent } from "./recipe-card/recipe-card.component";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { RecipeFormComponent } from "./recipe-form/recipe-form.component";

@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    RecipeCardComponent,
    RecipeDetailsComponent,
    RecipeFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatChipsModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    provideFirebaseApp(() =>
      initializeApp({
        projectId: "mine-recipe-app-empty",
        appId: "1:86900632916:web:0574fcbea2bbb9600aacc1",
        storageBucket: "mine-recipe-app-empty.appspot.com",
        apiKey: "AIzaSyDHGtZtSu10StiT0r0j09O0CqJ8jYvplaE",
        authDomain: "mine-recipe-app-empty.firebaseapp.com",
        messagingSenderId: "86900632916",
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

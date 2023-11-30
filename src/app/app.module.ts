import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Google Firebase
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp({
      "projectId":"mine-recipe-app-empty",
      "appId":"1:86900632916:web:0574fcbea2bbb9600aacc1",
      "storageBucket":"mine-recipe-app-empty.appspot.com",
      "apiKey":"AIzaSyDHGtZtSu10StiT0r0j09O0CqJ8jYvplaE",
      "authDomain":"mine-recipe-app-empty.firebaseapp.com",
      "messagingSenderId":"86900632916"
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

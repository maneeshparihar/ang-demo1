import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { CardListComponent } from './card-list/card-list.component';
import { NewCardInputComponent } from './new-card-input/new-card-input.component';

import {CardService} from './card.service';

import { environment } from './../environments/environment';


@NgModule({
  declarations: [

    AppComponent,
    CardComponent,
    CardListComponent,
    NewCardInputComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule
  ],

  providers: [CardService],
  bootstrap: [AppComponent]
})
export class AppModule { }

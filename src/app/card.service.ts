import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

import {Card} from './models/card';


@Injectable({
  providedIn: 'root'
})

export class CardService {
  private basePath = '/items';
  cardsRef: AngularFireList<Card>;
  cardRef: AngularFireObject<Card>;
  

  constructor(private db: AngularFireDatabase) {
    this.cardsRef = db.list('/cards');
   }


   getCardsList(): Observable<Card[]>{
      return this.cardsRef.snapshotChanges().pipe(map((arr) => {
        return arr.map((snap) => Object.assign(snap.payload.val(), {$key: snap.key}));
      }));
  }


  getCard(key: string): Observable<Card|null> {
    const cardPath = `${this.basePath}/$(key)`;
    const card = this.db.object(cardPath).valueChanges() as Observable<Card | null>;
    return card;
  }


  createCard(card: Card): void {
    this.cardsRef.push(card);
  }


  updateCard(key: string, value: any): void {
    this.cardsRef.update(key, value);

  }

  deleteCard(key: string): void {
    this.cardsRef.remove(key);
  }

  deleteAll(): void {
    this.cardsRef.remove();
  }

  // Default error handling for all actions 
  private handleError(error: Error) {
    console.error(error);
  }



  //  get(){
  //    return this.http.get(`/api/v1/cards.json`);
  //  }

  //  add(payload){
  //   return this.http.post(`/api/v1/cards.json`, {text: (payload.trim())});
  //  }
  
  //  remove (payload){
  //   return this.http.delete(`/api/v1/cards/${payload.id}.json`);
  //  }

  //  update(payload){
  //   return this.http.patch(`/api/v1/cards/${payload.id}.json`, payload);

   }




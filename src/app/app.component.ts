import { Component, HostListener } from '@angular/core';
import { CardService } from './card.service';
import {AngularFireDatabase} from 'angularfire2/database';
import { Card } from './models/card';
import {Observable} from 'rxjs';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public cards$: Observable<Card[]>;


  title = 'demo1';

  public cards: Array<any> = [
    {text: 'Card 1'},
    {text: 'Card 2'},
    {text: 'Card 3'},
    {text: 'Card 4'},
    {text: 'Card 5'},
    {text: 'Card 6'},
    {text: 'Card 7'},
    {text: 'Card 8'},
    {text: 'Card 9'},
    {text: 'Card 10'}

  ];

  // addCard(cardText: String){
  //   this.cards.push({text: cardText});
  //   console.log(this.cards);
  // }

  // constructor(private cardservice: CardService ){
  //   cardservice.get().subscribe((cards:any) => this.cards = cards);

  // };

addCard(cardText: string){
  this.cardService.createCard(new Card(cardText));
}


constructor(private cardService: CardService) {
  this.cards$ = this.cardService.getCardsList();
  
}




}

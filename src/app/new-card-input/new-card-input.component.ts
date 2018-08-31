import { Component, OnInit, Output, EventEmitter, HostListener, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-card-input',
  templateUrl: './new-card-input.component.html',
  styleUrls: ['./new-card-input.component.scss'],
  host: {'class': 'col-4'},
})
export class NewCardInputComponent implements OnInit {
  
  @Output() cardAdd = new EventEmitter<string>();


  public newCard: any = {text: ''};
  
  
  constructor() { };
  ngOnInit(){};

  @ViewChild('form') public form: NgForm;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent){
    if (event.code === 'Enter' && this.newCard.text.length > 0){
      // this.addCard(this.newCard.text);
      console.log('enter pressed');
      console.log(this.newCard.text);
      this.cardAdd.emit(this.newCard.text);
      this.newCard.text = '';
      //this will reset the text input element as it is set as ngModel

      

    }
  }
  

  

  


}

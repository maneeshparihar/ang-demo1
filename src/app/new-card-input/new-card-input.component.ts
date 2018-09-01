import { Component, OnInit, Output, EventEmitter, HostListener, ViewChild } from '@angular/core';
import { NgForm, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { takeWhile, debounceTime, filter } from 'rxjs/operators';

@Component({
  selector: 'app-new-card-input',
  templateUrl: './new-card-input.component.html',
  styleUrls: ['./new-card-input.component.scss'],
  host: {'class': 'col-4'},
})
export class NewCardInputComponent implements OnInit {
  newCardForm: FormGroup;
  private alive: boolean = true;
  @Output() cardAdd = new EventEmitter<string>();


  public newCard: any = {text: ''};
  @ViewChild('form') public form: NgForm;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // if (event.code === 'Enter' && this.newCard.text.length > 0){
      // this.addCard(this.newCard.text);
      // console.log('enter pressed');
    //  console.log(this.newCard.text);
    //  this.cardAdd.emit(this.newCard.text);
    //  this.newCard.text = '';
      //this will reset the text input element as it is set as ngModel


      if (event.code === 'Enter' && this.newCardForm.valid){
        
        // console.log('enter pressed');
        // console.log(this.newCard.text);
        // this.cardAdd.emit(this.newCard.text);
        this.addCard(this.newCardForm.controls['text'].value);
        
      }
  }

  
  constructor(fb: FormBuilder) {
    this.newCardForm = fb.group ({
      'text': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
    });

    this.newCardForm.valueChanges.pipe(
      filter((value) => this.newCardForm.valid),
      debounceTime(500),
      takeWhile(() => this.alive)
    ).subscribe(data => {
      console.log(data);
    });

  };

  ngOnInit() {};

  
  ngOnDestroy() {
    this.alive = false;
  }

  addCard(text) {
    this.cardAdd.emit(text);
    this.newCardForm.controls['text'].setValue('');
  }

  

  


}

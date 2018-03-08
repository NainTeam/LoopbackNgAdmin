import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-model-search',
  templateUrl: './model-search.component.html',
  styleUrls: ['./model-search.component.scss']
})
export class ModelSearchComponent implements OnInit {

  @Input()
  properties;

  property = 'any';
  text;

  @Output()
  submitted = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }


  onSubmitted() {
    if (this.property === 'any') {
      this.searchAny();
    }
    else {
      this.searchProperty();
    }
  }

  searchProperty() {
    this.submitted.emit({
      property: this.property,
      value: this.text
    });
  }

  searchAny() {
    this.submitted.emit({
      property: this.property,
      value: this.text,
      properties: this.properties
    });
  }

}

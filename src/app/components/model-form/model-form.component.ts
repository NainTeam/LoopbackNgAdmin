import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

interface ModelProperty {
  name: String;
  type: String;
}


@Component({
  selector: 'app-model-form',
  templateUrl: './model-form.component.html',
  styleUrls: ['./model-form.component.scss']
})
export class ModelFormComponent implements OnInit {

  private item;

  @Input()
  properties;

  @Input()
  public formProperties = [];

  @Input()
  private name;

  @Output() onSubmit = new EventEmitter<any>();


  constructor() { }

  ngOnInit() {
  }

  @Input()
  set model(item) {
    this.item = item;
    if (!this.formProperties || this.formProperties.length === 0) {
      this.formProperties = [];
      if (!this.properties || this.properties.length === 0) {
        this.loadParamsFromModel();
      } else {
        this.loadParamsProperties();
      }
    }
  }

  loadParamsFromModel() {
    const props = this.getProps();
    for (var i in props) {
      this.formProperties.push(props[i]);
    }
  }

  loadParamsProperties() {
    const props = this.getProps();
    for (var i in props) {
      if (this.properties.includes(i)) {
        this.formProperties.push(props[i]);
      }
    }
  }


  getProps() {
    return this.item.constructor.getModelDefinition().properties;
  }

  getType(element) {
    return typeof (element);
  }

  submitted() {
    this.onSubmit.emit(this.item);
  }

}

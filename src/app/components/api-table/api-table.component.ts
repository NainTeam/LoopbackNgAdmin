import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-api-table',
  templateUrl: './api-table.component.html',
  styleUrls: ['./api-table.component.scss']
})
export class ApiTableComponent implements OnInit {

  @Input()
  tableItems: [any];

  tableModel;

  @Input()
  properties;

  tableProperties = [];

  @Input()
  route;


  constructor() { }

  ngOnInit() {
    this.tableModel = this.tableItems ? this.tableItems[0] : {};
    if (!this.properties) {
      this.readPropertiesDefault();
    } else {
      this.readArrProperties();
    }
  }


  readArrProperties() {
    const props = this.getProps();
    for (var i in props) {
      if (this.properties.includes(i)) {
        this.tableProperties.push(props[i]);
      }
    }
  }

  getProps() {
    return this.tableModel.constructor.getModelDefinition().properties;
  }


  readPropertiesDefault() {
    this.tableProperties = [];
    const props = this.getProps();
    for (var i in props) {
      this.tableProperties.push(props[i]);
    }
  }

}

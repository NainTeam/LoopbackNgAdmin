import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[app-api-row]',
  templateUrl: './api-row.component.html',
  styleUrls: ['./api-row.component.scss']
})
export class ApiRowComponent implements OnInit {

  @Input()
  rowItem;

  @Input()
  tableProperties;

  constructor() { }

  ngOnInit() {
  }

}

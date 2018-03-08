import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {


  @Input()
  totalCount = 0;

  @Input()
  limit = 15;

  totalPages = 0;

  @Input()
  currentPage = 0;

  @Output()
  next = new EventEmitter<any>();

  @Output()
  prev = new EventEmitter<any>();

  @Output()
  pageSelected = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.totalPages = this.totalCount / this.limit;
  }

  onNext() {
    this.currentPage += 1;
    this.next.emit(this.currentPage);
  }

  onPrev() {
    this.currentPage -= 1;
    this.prev.emit(this.currentPage);
  }

  isDisabled(): boolean {
    return (this.getLastNumber() >= this.totalCount);
  }

  getLastNumber() {
    if (this.totalCount < this.limit) {
      return this.totalCount;
    }
    return (this.currentPage * this.limit) + this.limit;
  }

}

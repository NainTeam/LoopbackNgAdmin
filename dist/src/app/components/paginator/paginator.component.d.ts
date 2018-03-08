import { OnInit, EventEmitter } from '@angular/core';
export declare class PaginatorComponent implements OnInit {
    totalCount: number;
    limit: number;
    totalPages: number;
    currentPage: number;
    next: EventEmitter<any>;
    prev: EventEmitter<any>;
    pageSelected: EventEmitter<any>;
    constructor();
    ngOnInit(): void;
    onNext(): void;
    onPrev(): void;
    isDisabled(): boolean;
    getLastNumber(): number;
}

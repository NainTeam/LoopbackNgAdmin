import { OnInit, EventEmitter } from '@angular/core';
export declare class ModelSearchComponent implements OnInit {
    properties: any;
    property: string;
    text: any;
    submitted: EventEmitter<{}>;
    constructor();
    ngOnInit(): void;
    onSubmitted(): void;
    searchProperty(): void;
    searchAny(): void;
}

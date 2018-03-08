import { OnInit, EventEmitter } from '@angular/core';
export declare class ModelFormComponent implements OnInit {
    private item;
    properties: any;
    formProperties: any[];
    private name;
    onSubmit: EventEmitter<any>;
    constructor();
    ngOnInit(): void;
    model: any;
    loadParamsFromModel(): void;
    loadParamsProperties(): void;
    getProps(): any;
    getType(element: any): "string" | "number" | "boolean" | "symbol" | "undefined" | "object" | "function";
    submitted(): void;
}

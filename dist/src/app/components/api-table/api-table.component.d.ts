import { OnInit } from '@angular/core';
export declare class ApiTableComponent implements OnInit {
    tableItems: [any];
    tableModel: any;
    properties: any;
    tableProperties: any[];
    route: any;
    constructor();
    ngOnInit(): void;
    readArrProperties(): void;
    getProps(): any;
    readPropertiesDefault(): void;
}

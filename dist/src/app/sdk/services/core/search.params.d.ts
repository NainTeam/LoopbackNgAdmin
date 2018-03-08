import { URLSearchParams } from '@angular/http';
/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
* @module JSONSearchParams
* @license MIT
* @description
* JSON Parser and Wrapper for the Angular2 URLSearchParams
* This module correctly encodes a json object into a query string and then creates
* an instance of the URLSearchParams component for later use in HTTP Calls
**/
export declare class JSONSearchParams {
    private _usp;
    setJSON(obj: any): void;
    getURLSearchParams(): URLSearchParams;
    private _JSON2URL(obj, parent);
    private _parseParam(key, value, parent);
}

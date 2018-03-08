import { Component, Input, Output, EventEmitter, Pipe, Injectable, Inject, NgZone, Optional, NgModule } from '@angular/core';
import 'rxjs/add/observable/merge';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/merge';
import 'rxjs/add/observable/throw';
import { URLSearchParams, Http, Headers, Request, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ApiTableComponent {
    constructor() {
        this.tableProperties = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.tableModel = this.tableItems ? this.tableItems[0] : {};
        if (!this.properties) {
            this.readPropertiesDefault();
        }
        else {
            this.readArrProperties();
        }
    }
    /**
     * @return {?}
     */
    readArrProperties() {
        const /** @type {?} */ props = this.getProps();
        for (var /** @type {?} */ i in props) {
            if (this.properties.includes(i)) {
                this.tableProperties.push(props[i]);
            }
        }
    }
    /**
     * @return {?}
     */
    getProps() {
        return this.tableModel.constructor.getModelDefinition().properties;
    }
    /**
     * @return {?}
     */
    readPropertiesDefault() {
        this.tableProperties = [];
        const /** @type {?} */ props = this.getProps();
        for (var /** @type {?} */ i in props) {
            this.tableProperties.push(props[i]);
        }
    }
}
ApiTableComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-api-table',
                template: `<table class="table table-hover table-sm">
  <thead>
    <tr>
      <th *ngFor="let item of tableProperties" class="text-capitalize" scope="col"> {{item.name}}</th>
    </tr>
  </thead>
  <tbody>
    <tr [routerLink]="[route, item.id]" app-api-row *ngFor="let item of tableItems" [rowItem]="item" [tableProperties]="tableProperties">
    </tr>
  </tbody>
</table>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
ApiTableComponent.ctorParameters = () => [];
ApiTableComponent.propDecorators = {
    "tableItems": [{ type: Input },],
    "properties": [{ type: Input },],
    "route": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ApiRowComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
ApiRowComponent.decorators = [
    { type: Component, args: [{
                selector: '[app-api-row]',
                template: `<td *ngFor="let prop of tableProperties" >
  <div [ngSwitch]="prop.name.toLowerCase()">
    <span *ngSwitchCase="'date'">
      {{rowItem[prop.name] | date}}
    </span>
    <span *ngSwitchDefault>
      {{rowItem[prop.name]}}
    </span>
  </div>
</td>
<td>
</td>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
ApiRowComponent.ctorParameters = () => [];
ApiRowComponent.propDecorators = {
    "rowItem": [{ type: Input },],
    "tableProperties": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ModelFormComponent {
    constructor() {
        this.formProperties = [];
        this.onSubmit = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} item
     * @return {?}
     */
    set model(item) {
        this.item = item;
        if (!this.formProperties || this.formProperties.length === 0) {
            this.formProperties = [];
            if (!this.properties || this.properties.length === 0) {
                this.loadParamsFromModel();
            }
            else {
                this.loadParamsProperties();
            }
        }
    }
    /**
     * @return {?}
     */
    loadParamsFromModel() {
        const /** @type {?} */ props = this.getProps();
        for (var /** @type {?} */ i in props) {
            this.formProperties.push(props[i]);
        }
    }
    /**
     * @return {?}
     */
    loadParamsProperties() {
        const /** @type {?} */ props = this.getProps();
        for (var /** @type {?} */ i in props) {
            if (this.properties.includes(i)) {
                this.formProperties.push(props[i]);
            }
        }
    }
    /**
     * @return {?}
     */
    getProps() {
        return this.item.constructor.getModelDefinition().properties;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    getType(element) {
        return typeof (element);
    }
    /**
     * @return {?}
     */
    submitted() {
        this.onSubmit.emit(this.item);
    }
}
ModelFormComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-model-form',
                template: `<div class="container">
  <ng-content select="[header]"></ng-content>
  <hr>
  <form (ngSubmit)="submitted()">
    <ng-content select="[formTop]"></ng-content>
    <div class="form-group row" *ngFor="let element of formProperties">
      <label for="staticEmail" class="col-sm-2 col-form-label">{{element.name}}</label>
      <div class="col-sm-10" [ngSwitch]="element.type" *ngIf="element.name !='id'; else idInput">
        <input type="checkbox" class="form-control" [name]="element.name" [(ngModel)]="item[element.name]" *ngSwitchCase="'boolean'">
        <input type="email" class="form-control" [name]="element.name" [(ngModel)]="item[element.name]" *ngSwitchCase="'email'">
        <textarea class="form-control" [name]="element.name" [(ngModel)]="item[element.name]" *ngSwitchCase="'textarea'">
        </textarea>
        <div [froalaEditor] *ngSwitchCase="'rtext'" [(froalaModel)]="item[element.name]">
          {{item[element.name]}}
        </div>
        <input type="text" class="form-control" [name]="element.name" [(ngModel)]="item[element.name]" *ngSwitchDefault>
      </div>
      <ng-template #idInput>
        <div class="col-sm-10">
          <input type="text" class="form-control" [name]="element.name" [(ngModel)]="item[element.name]" readonly>
        </div>
      </ng-template>
      <ng-content select="[form]"></ng-content>
    </div>
    <div class="form-group row">
      <button type="submit" class="btn btn-primary">Submit</button>
      <ng-content select="[buttons]"></ng-content>
    </div>
  </form>
</div>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
ModelFormComponent.ctorParameters = () => [];
ModelFormComponent.propDecorators = {
    "properties": [{ type: Input },],
    "formProperties": [{ type: Input },],
    "name": [{ type: Input },],
    "onSubmit": [{ type: Output },],
    "model": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PaginatorComponent {
    constructor() {
        this.totalCount = 0;
        this.limit = 15;
        this.totalPages = 0;
        this.currentPage = 0;
        this.next = new EventEmitter();
        this.prev = new EventEmitter();
        this.pageSelected = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.totalPages = this.totalCount / this.limit;
    }
    /**
     * @return {?}
     */
    onNext() {
        this.currentPage += 1;
        this.next.emit(this.currentPage);
    }
    /**
     * @return {?}
     */
    onPrev() {
        this.currentPage -= 1;
        this.prev.emit(this.currentPage);
    }
    /**
     * @return {?}
     */
    isDisabled() {
        return (this.getLastNumber() >= this.totalCount);
    }
    /**
     * @return {?}
     */
    getLastNumber() {
        if (this.totalCount < this.limit) {
            return this.totalCount;
        }
        return (this.currentPage * this.limit) + this.limit;
    }
}
PaginatorComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-paginator',
                template: `<nav aria-label="Page navigation example">
  {{1+(currentPage*limit)}}-{{getLastNumber()}} of {{totalCount}}
  <ul class="pagination justify-content-end">
    <li class="page-item" [class.disabled]="currentPage==0">
      <a class="page-link" (click)="onPrev()" tabindex="-1">Previous</a>
    </li>
    <li class="page-item" [class.disabled]="isDisabled()">
      <a class="page-link" (click)="onNext()">Next</a>
    </li>
  </ul>
</nav>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
PaginatorComponent.ctorParameters = () => [];
PaginatorComponent.propDecorators = {
    "totalCount": [{ type: Input },],
    "limit": [{ type: Input },],
    "currentPage": [{ type: Input },],
    "next": [{ type: Output },],
    "prev": [{ type: Output },],
    "pageSelected": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CapitalizePipe {
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    transform(value, args) {
        return value[0].toUpperCase() + value.slice(1, value.length);
    }
}
CapitalizePipe.decorators = [
    { type: Pipe, args: [{
                name: 'capitalize'
            },] },
];
/** @nocollapse */
CapitalizePipe.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ModelSearchComponent {
    constructor() {
        this.property = 'any';
        this.submitted = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    onSubmitted() {
        if (this.property === 'any') {
            this.searchAny();
        }
        else {
            this.searchProperty();
        }
    }
    /**
     * @return {?}
     */
    searchProperty() {
        this.submitted.emit({
            property: this.property,
            value: this.text
        });
    }
    /**
     * @return {?}
     */
    searchAny() {
        this.submitted.emit({
            property: this.property,
            value: this.text,
            properties: this.properties
        });
    }
}
ModelSearchComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-model-search',
                template: `<form>
  <div class="form-row">
    <div class="col-md-2 mb-3">
      <select name="property" [(ngModel)]="property" name="property" class="form-control">
        <option selected value="any">Any</option>
        <option class="text-capitalize" *ngFor="let item of properties" [value]="item">{{item}}</option>
      </select>
    </div>
    <div class="col-md-8 mb-7">
      <input type="text" class="form-control" [placeholder]="property" required [(ngModel)]="text" name="text">
    </div>
    <div class="col-md-2 mb-2">
      <button class="btn btn-primary form-control" (click)="onSubmitted()">Search</button>
    </div>
  </div>
</form>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
ModelSearchComponent.ctorParameters = () => [];
ModelSearchComponent.propDecorators = {
    "properties": [{ type: Input },],
    "submitted": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/* tslint:disable */
/**
 * @record
 */

class User {
    /**
     * @param {?=} data
     */
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `User`.
     * @return {?}
     */
    static getModelName() {
        return "User";
    }
    /**
     * \@method factory
     * @author Jonathan Casarrubias
     * @license MIT
     * This method creates an instance of User for dynamic purposes.
     *
     * @param {?} data
     * @return {?}
     */
    static factory(data) {
        return new User(data);
    }
    /**
     * \@method getModelDefinition
     * @author Julien Ledun
     * @license MIT
     * This method returns an object that represents some of the model
     * definitions.
     *
     * @return {?}
     */
    static getModelDefinition() {
        return {
            name: 'User',
            plural: 'Users',
            path: 'Users',
            idName: 'id',
            properties: {
                "realm": {
                    name: 'realm',
                    type: 'string'
                },
                "username": {
                    name: 'username',
                    type: 'string'
                },
                "email": {
                    name: 'email',
                    type: 'string'
                },
                "emailVerified": {
                    name: 'emailVerified',
                    type: 'boolean'
                },
                "id": {
                    name: 'id',
                    type: 'any'
                },
                "password": {
                    name: 'password',
                    type: 'string'
                },
            },
            relations: {
                accessTokens: {
                    name: 'accessTokens',
                    type: 'any[]',
                    model: '',
                    relationType: 'hasMany',
                    keyFrom: 'id',
                    keyTo: 'userId'
                },
            }
        };
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/* tslint:disable */
/**
 * @record
 */

class Admin {
    /**
     * @param {?=} data
     */
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `Admin`.
     * @return {?}
     */
    static getModelName() {
        return "Admin";
    }
    /**
     * \@method factory
     * @author Jonathan Casarrubias
     * @license MIT
     * This method creates an instance of Admin for dynamic purposes.
     *
     * @param {?} data
     * @return {?}
     */
    static factory(data) {
        return new Admin(data);
    }
    /**
     * \@method getModelDefinition
     * @author Julien Ledun
     * @license MIT
     * This method returns an object that represents some of the model
     * definitions.
     *
     * @return {?}
     */
    static getModelDefinition() {
        return {
            name: 'Admin',
            plural: 'Admins',
            path: 'Admins',
            idName: 'id',
            properties: {
                "realm": {
                    name: 'realm',
                    type: 'string'
                },
                "username": {
                    name: 'username',
                    type: 'string'
                },
                "email": {
                    name: 'email',
                    type: 'string'
                },
                "emailVerified": {
                    name: 'emailVerified',
                    type: 'boolean'
                },
                "id": {
                    name: 'id',
                    type: 'any'
                },
                "password": {
                    name: 'password',
                    type: 'string'
                },
            },
            relations: {
                accessTokens: {
                    name: 'accessTokens',
                    type: 'any[]',
                    model: '',
                    relationType: 'hasMany',
                    keyFrom: 'id',
                    keyTo: 'userId'
                },
            }
        };
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/* tslint:disable */
/**
 * @record
 */

/**
 * @record
 */


class SDKToken {
    /**
     * @param {?=} data
     */
    constructor(data) {
        this.id = null;
        this.ttl = null;
        this.scopes = null;
        this.created = null;
        this.userId = null;
        this.user = null;
        this.rememberMe = null;
        Object.assign(this, data);
    }
}
/**
 * This GeoPoint represents both, LoopBack and MongoDB GeoPoint
 *
 * @record
 */

/**
 * @record
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
 * @license MIT
 * \@description
 * This class allows to create FireLoop References which will be in sync with
 * Server. It also allows to create FireLoop Reference Childs, that allows to
 * persist data according the generic model relationships.
 *
 * @template T
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/* tslint:disable */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 *  \@module Storage
 * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
 * @license MIT
 * \@description
 * The InternalStorage class is used for dependency injection swapping.
 * It will be provided using factory method from different sources.
 *
 */
class BaseStorage {
    /**
     * \@method get
     * \@description
     * The getter will return any type of data persisted in storage.
     *
     * @param {?} key Storage key name
     * @return {?}
     */
    get(key) { }
    /**
     * \@method set
     * \@description
     * The setter will return any type of data persisted in localStorage.
     *
     * @param {?} key Storage key name
     * @param {?} value Any value
     * @param {?=} expires
     * @return {?}
     */
    set(key, value, expires) { }
    /**
     * \@method remove
     * \@description
     * This method will remove a localStorage item from the client.
     *
     * @param {?} key Storage key name
     * @return {?}
     */
    remove(key) { }
}
/**
 *  \@module InternalStorage
 * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
 * @license MIT
 * \@description
 * The InternalStorage class is used for dependency injection swapping.
 * It will be provided using factory method from different sources.
 * This is mainly required because Angular Universal integration.
 * It does inject a CookieStorage instead of LocalStorage.
 *
 */
class InternalStorage extends BaseStorage {
}
/**
 *  \@module SDKStorage
 * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
 * @license MIT
 * \@description
 * The SDKStorage class is used for dependency injection swapping.
 * It will be provided using factory method according the right environment.
 * This is created for public usage, to allow persisting custom data
 * Into the local storage API.
 *
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @author Jonathan Casarrubias <twitter:\@johncasarrubias> <github:\@mean-expert-official>
 * \@module SocketConnection
 * @license MIT
 * \@description
 * This module handle socket connections and return singleton instances for each
 * connection, it will use the SDK Socket Driver Available currently supporting
 * Angular 2 for web, NativeScript 2 and Angular Universal.
 *
 */
class LoopBackAuth {
    /**
     * \@method constructor
     * \@description
     * The constructor will initialize the token loading data from storage
     *
     * @param {?} storage Internal Storage Driver
     */
    constructor(storage) {
        this.storage = storage;
        /**
         *
         *
         */
        this.token = new SDKToken();
        /**
         *
         *
         */
        this.prefix = '$LoopBackSDK$';
        this.token.id = this.load('id');
        this.token.user = this.load('user');
        this.token.userId = this.load('userId');
        this.token.created = this.load('created');
        this.token.ttl = this.load('ttl');
        this.token.rememberMe = this.load('rememberMe');
    }
    /**
     * \@method setRememberMe
     * \@description
     * This method will set a flag in order to remember the current credentials
     *
     * @param {?} value Flag to remember credentials
     * @return {?}
     */
    setRememberMe(value) {
        this.token.rememberMe = value;
    }
    /**
     * \@method setUser
     * \@description
     * This method will update the user information and persist it if the
     * rememberMe flag is set.
     *
     * @param {?} user Any type of user model
     * @return {?}
     */
    setUser(user) {
        this.token.user = user;
        this.save();
    }
    /**
     * \@method setToken
     * \@description
     * This method will set a flag in order to remember the current credentials
     *
     * @param {?} token SDKToken or casted AccessToken instance
     * @return {?}
     */
    setToken(token) {
        this.token = Object.assign({}, this.token, token);
        this.save();
    }
    /**
     * \@method getToken
     * \@description
     * This method will set a flag in order to remember the current credentials.
     *
     * @return {?}
     */
    getToken() {
        return /** @type {?} */ (this.token);
    }
    /**
     * \@method getAccessTokenId
     * \@description
     * This method will return the actual token string, not the object instance.
     *
     * @return {?}
     */
    getAccessTokenId() {
        return this.token.id;
    }
    /**
     * \@method getCurrentUserId
     * \@description
     * This method will return the current user id, it can be number or string.
     *
     * @return {?}
     */
    getCurrentUserId() {
        return this.token.userId;
    }
    /**
     * \@method getCurrentUserData
     * \@description
     * This method will return the current user instance.
     *
     * @return {?}
     */
    getCurrentUserData() {
        return (typeof this.token.user === 'string') ? JSON.parse(this.token.user) : this.token.user;
    }
    /**
     * \@method save
     * \@description
     * This method will save in either local storage or cookies the current credentials.
     * But only if rememberMe is enabled.
     *
     * @return {?} Whether or not the information was saved
     */
    save() {
        let /** @type {?} */ today = new Date();
        let /** @type {?} */ expires = new Date(today.getTime() + (this.token.ttl * 1000));
        this.persist('id', this.token.id, expires);
        this.persist('user', this.token.user, expires);
        this.persist('userId', this.token.userId, expires);
        this.persist('created', this.token.created, expires);
        this.persist('ttl', this.token.ttl, expires);
        this.persist('rememberMe', this.token.rememberMe, expires);
        return true;
    }
    ;
    /**
     * \@method load
     * \@description
     * This method will load either from local storage or cookies the provided property.
     *
     * @param {?} prop Property name
     * @return {?} Any information persisted in storage
     */
    load(prop) {
        return this.storage.get(`${this.prefix}${prop}`);
    }
    /**
     * \@method clear
     * \@description
     * This method will clear cookies or the local storage.
     *
     * @return {?}
     */
    clear() {
        Object.keys(this.token).forEach((prop) => this.storage.remove(`${this.prefix}${prop}`));
        this.token = new SDKToken();
    }
    /**
     * \@method persist
     * \@description
     * This method saves values to storage
     *
     * @param {?} prop
     * @param {?} value
     * @param {?=} expires
     * @return {?}
     */
    persist(prop, value, expires) {
        try {
            this.storage.set(`${this.prefix}${prop}`, (typeof value === 'object') ? JSON.stringify(value) : value, this.token.rememberMe ? expires : null);
        }
        catch (/** @type {?} */ err) {
            console.error('Cannot access local/session storage:', err);
        }
    }
}
LoopBackAuth.decorators = [
    { type: Injectable },
];
/** @nocollapse */
LoopBackAuth.ctorParameters = () => [
    { type: InternalStorage, decorators: [{ type: Inject, args: [InternalStorage,] },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Default error handler
 */
class ErrorHandler {
    /**
     * @param {?} error
     * @return {?}
     */
    handleError(error) {
        return Observable.throw(error.json().error || 'Server error');
    }
}
ErrorHandler.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ErrorHandler.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @author Jonathan Casarrubias <twitter:\@johncasarrubias> <github:\@mean-expert-official>
 * \@module JSONSearchParams
 * @license MIT
 * \@description
 * JSON Parser and Wrapper for the Angular2 URLSearchParams
 * This module correctly encodes a json object into a query string and then creates
 * an instance of the URLSearchParams component for later use in HTTP Calls
 *
 */
class JSONSearchParams {
    /**
     * @param {?} obj
     * @return {?}
     */
    setJSON(obj) {
        this._usp = new URLSearchParams(this._JSON2URL(obj, false));
    }
    /**
     * @return {?}
     */
    getURLSearchParams() {
        return this._usp;
    }
    /**
     * @param {?} obj
     * @param {?} parent
     * @return {?}
     */
    _JSON2URL(obj, parent) {
        var /** @type {?} */ parts = [];
        for (var /** @type {?} */ key in obj)
            parts.push(this._parseParam(key, obj[key], parent));
        return parts.join('&');
    }
    /**
     * @param {?} key
     * @param {?} value
     * @param {?} parent
     * @return {?}
     */
    _parseParam(key, value, parent) {
        let /** @type {?} */ processedKey = parent ? parent + '[' + key + ']' : key;
        if (value && (/** @type {?} */ ((typeof value)) === 'object' || Array.isArray(value))) {
            return this._JSON2URL(value, processedKey);
        }
        return processedKey + '=' + value;
    }
}
JSONSearchParams.decorators = [
    { type: Injectable },
];
/** @nocollapse */
JSONSearchParams.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * \@module LoopBackConfig
 * \@description
 *
 * The LoopBackConfig module help developers to externally
 * configure the base url and api version for loopback.io
 *
 * Example
 *
 * import { LoopBackConfig } from './sdk';
 *
 * \@Component() // No metadata needed for this module
 *
 * export class MyApp {
 *   constructor() {
 *     LoopBackConfig.setBaseURL('http://localhost:3000');
 *     LoopBackConfig.setApiVersion('api');
 *   }
 * }
 *
 */
class LoopBackConfig {
    /**
     * @param {?=} version
     * @return {?}
     */
    static setApiVersion(version = 'api') {
        LoopBackConfig.version = version;
    }
    /**
     * @return {?}
     */
    static getApiVersion() {
        return LoopBackConfig.version;
    }
    /**
     * @param {?=} url
     * @return {?}
     */
    static setBaseURL(url = '/') {
        LoopBackConfig.path = url;
    }
    /**
     * @return {?}
     */
    static getPath() {
        return LoopBackConfig.path;
    }
    /**
     * @param {?=} authPrefix
     * @return {?}
     */
    static setAuthPrefix(authPrefix = '') {
        LoopBackConfig.authPrefix = authPrefix;
    }
    /**
     * @return {?}
     */
    static getAuthPrefix() {
        return LoopBackConfig.authPrefix;
    }
    /**
     * @param {?} isEnabled
     * @return {?}
     */
    static setDebugMode(isEnabled) {
        LoopBackConfig.debug = isEnabled;
    }
    /**
     * @return {?}
     */
    static debuggable() {
        return LoopBackConfig.debug;
    }
    /**
     * @return {?}
     */
    static filterOnUrl() {
        LoopBackConfig.filterOn = 'url';
    }
    /**
     * @return {?}
     */
    static filterOnHeaders() {
        LoopBackConfig.filterOn = 'headers';
    }
    /**
     * @return {?}
     */
    static isHeadersFilteringSet() {
        return (LoopBackConfig.filterOn === 'headers');
    }
    /**
     * @return {?}
     */
    static setSecureWebSockets() {
        LoopBackConfig.secure = true;
    }
    /**
     * @return {?}
     */
    static unsetSecureWebSockets() {
        LoopBackConfig.secure = false;
    }
    /**
     * @return {?}
     */
    static isSecureWebSocketsSet() {
        return LoopBackConfig.secure;
    }
    /**
     * @param {?=} withCredentials
     * @return {?}
     */
    static setRequestOptionsCredentials(withCredentials = false) {
        LoopBackConfig.withCredentials = withCredentials;
    }
    /**
     * @return {?}
     */
    static getRequestOptionsCredentials() {
        return LoopBackConfig.withCredentials;
    }
}
LoopBackConfig.path = '//0.0.0.0:3000';
LoopBackConfig.version = 'api';
LoopBackConfig.authPrefix = '';
LoopBackConfig.debug = true;
LoopBackConfig.filterOn = 'headers';
LoopBackConfig.secure = false;
LoopBackConfig.withCredentials = false;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */

class SDKModels {
    constructor() {
        this.models = {
            User: User,
            Admin: Admin
        };
    }
    /**
     * @param {?} modelName
     * @return {?}
     */
    get(modelName) {
        return this.models[modelName];
    }
    /**
     * @return {?}
     */
    getAll() {
        return this.models;
    }
    /**
     * @return {?}
     */
    getModelNames() {
        return Object.keys(this.models);
    }
}
SDKModels.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SDKModels.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 *  \@module SocketDriver
 * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
 * @license MIT
 * \@description
 * The SocketDriver class is used for dependency injection swapping.
 * It will be provided using factory method from different sources.
 *
 */
class SocketDriver {
    /**
     * @param {?} url
     * @param {?} options
     * @return {?}
     */
    connect(url, options) { }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @author Jonathan Casarrubias <twitter:\@johncasarrubias> <github:\@mean-expert-official>
 * \@module SocketConnection
 * @license MIT
 * \@description
 * This module handle socket connections and return singleton instances for each
 * connection, it will use the SDK Socket Driver Available currently supporting
 * Angular 2 for web, NativeScript 2 and Angular Universal.
 *
 */
class SocketConnection {
    /**
     * \@method constructor
     * \@description
     * The constructor will set references for the shared hot observables from
     * the class subjects. Then it will subscribe each of these observables
     * that will create a channel that later will be shared between subscribers.
     *
     * @param {?} driver Socket IO Driver
     * @param {?} zone Angular 2 Zone
     */
    constructor(driver, zone) {
        this.driver = driver;
        this.zone = zone;
        this.subjects = {
            onConnect: new Subject(),
            onDisconnect: new Subject(),
            onAuthenticated: new Subject(),
            onUnAuthorized: new Subject()
        };
        this.sharedObservables = {};
        this.authenticated = false;
        this.sharedObservables = {
            sharedOnConnect: this.subjects.onConnect.asObservable().share(),
            sharedOnDisconnect: this.subjects.onDisconnect.asObservable().share(),
            sharedOnAuthenticated: this.subjects.onAuthenticated.asObservable().share(),
            sharedOnUnAuthorized: this.subjects.onUnAuthorized.asObservable().share()
        };
        // This is needed to create the first channel, subsequents will share the connection
        // We are using Hot Observables to avoid duplicating connection status events.
        this.sharedObservables.sharedOnConnect.subscribe();
        this.sharedObservables.sharedOnDisconnect.subscribe();
        this.sharedObservables.sharedOnAuthenticated.subscribe();
        this.sharedObservables.sharedOnUnAuthorized.subscribe();
    }
    /**
     * \@method connect
     * \@description
     * This method will create a new socket connection when not previously established.
     * If there is a broken connection it will re-connect.
     *
     * @param {?=} token AccesToken instance
     * @return {?}
     */
    connect(token = null) {
        if (!this.socket) {
            console.info('Creating a new connection with: ', LoopBackConfig.getPath());
            // Create new socket connection
            this.socket = this.driver.connect(LoopBackConfig.getPath(), {
                log: false,
                secure: LoopBackConfig.isSecureWebSocketsSet(),
                forceNew: true,
                forceWebsockets: true,
                transports: ['websocket']
            });
            // Listen for connection
            this.on('connect', () => {
                this.subjects.onConnect.next('connected');
                // Authenticate or start heartbeat now
                this.emit('authentication', token);
            });
            // Listen for authentication
            this.on('authenticated', () => {
                this.authenticated = true;
                this.subjects.onAuthenticated.next();
                this.heartbeater();
            });
            // Listen for authentication
            this.on('unauthorized', (err) => {
                this.authenticated = false;
                this.subjects.onUnAuthorized.next(err);
            });
            // Listen for disconnections
            this.on('disconnect', (status) => this.subjects.onDisconnect.next(status));
        }
        else if (this.socket && !this.socket.connected) {
            if (typeof this.socket.off === 'function') {
                this.socket.off();
            }
            if (typeof this.socket.destroy === 'function') {
                this.socket.destroy();
            }
            delete this.socket;
            this.connect(token);
        }
    }
    /**
     * \@method isConnected
     * \@description
     * This method will return true or false depending on established connections
     *
     * @return {?}
     */
    isConnected() {
        return (this.socket && this.socket.connected);
    }
    /**
     * \@method on
     * \@description
     * This method listen for server events from the current WebSocket connection.
     * This method is a facade that will wrap the original "on" method and run it
     * within the Angular Zone to avoid update issues.
     *
     * @param {?} event Event name
     * @param {?} handler Event listener handler
     * @return {?}
     */
    on(event, handler) {
        this.socket.on(event, (data) => this.zone.run(() => handler(data)));
    }
    /**
     * \@method emit
     * \@description
     * This method will send any type of data to the server according the event set.
     *
     * @param {?} event Event name
     * @param {?=} data Any type of data
     * @return {?}
     */
    emit(event, data) {
        if (data) {
            this.socket.emit(event, data);
        }
        else {
            this.socket.emit(event);
        }
    }
    /**
     * \@method removeListener
     * \@description
     * This method will wrap the original "on" method and run it within the Angular Zone
     * Note: off is being used since the nativescript socket io client does not provide
     * removeListener method, but only provides with off which is provided in any platform.
     *
     * @param {?} event Event name
     * @param {?} handler Event listener handler
     * @return {?}
     */
    removeListener(event, handler) {
        if (typeof this.socket.off === 'function') {
            this.socket.off(event, handler);
        }
    }
    /**
     * \@method removeAllListeners
     * \@description
     * This method will wrap the original "on" method and run it within the Angular Zone
     * Note: off is being used since the nativescript socket io client does not provide
     * removeListener method, but only provides with off which is provided in any platform.
     *
     * @param {?} event Event name
     * @return {?}
     */
    removeAllListeners(event) {
        if (typeof this.socket.removeAllListeners === 'function') {
            this.socket.removeAllListeners(event);
        }
    }
    /**
     * \@method disconnect
     * \@description
     * This will disconnect the client from the server
     *
     * @return {?}
     */
    disconnect() {
        this.socket.disconnect();
    }
    /**
     * \@method heartbeater
     * \@description
     * This will keep the connection as active, even when users are not sending
     * data, this avoids disconnection because of a connection not being used.
     *
     * @return {?}
     */
    heartbeater() {
        let /** @type {?} */ heartbeater = setInterval(() => {
            if (this.isConnected()) {
                this.socket.emit('lb-ping');
            }
            else {
                this.socket.removeAllListeners('lb-pong');
                clearInterval(heartbeater);
            }
        }, 15000);
        this.socket.on('lb-pong', (data) => console.info('Heartbeat: ', data));
    }
}
SocketConnection.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SocketConnection.ctorParameters = () => [
    { type: SocketDriver, decorators: [{ type: Inject, args: [SocketDriver,] },] },
    { type: NgZone, decorators: [{ type: Inject, args: [NgZone,] },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * \@module BaseLoopBackApi
 * @author Jonathan Casarrubias <\@johncasarrubias> <github:jonathan-casarrubias>
 * @author Nikolay Matiushenkov <https://github.com/mnvx>
 * @license MIT
 * \@description
 * Abstract class that will be implemented in every custom service automatically built
 * by the sdk builder.
 * It provides the core functionallity for every API call, either by HTTP Calls or by
 * WebSockets.
 *
 * @abstract
 */
class BaseLoopBackApi {
    /**
     * @param {?} http
     * @param {?} connection
     * @param {?} models
     * @param {?} auth
     * @param {?} searchParams
     * @param {?} errorHandler
     */
    constructor(http, connection, models, auth, searchParams, errorHandler) {
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.searchParams = searchParams;
        this.errorHandler = errorHandler;
        this.model = this.models.get(this.getModelName());
    }
    /**
     * @return {?}
     */
    getModel() {
        return this.model;
    }
    /**
     * \@method request
     * \@description
     * This is a core method, every HTTP Call will be done from here, every API Service will
     * extend this class and use this method to get RESTful communication.
     *
     * @param {?} method      Request method (GET, POST, PUT)
     * @param {?} url         Request url (my-host/my-url/:id)
     * @param {?=} routeParams Values of url parameters
     * @param {?=} urlParams   Parameters for building url (filter and other)
     * @param {?=} postBody    Request postBody
     * @param {?=} pubsub
     * @param {?=} customHeaders
     * @return {?}
     */
    request(method, url, routeParams = {}, urlParams = {}, postBody = {}, pubsub = false, customHeaders) {
        // Transpile route variables to the actual request Values
        Object.keys(routeParams).forEach((key) => {
            url = url.replace(new RegExp(":" + key + "(\/|$)", "g"), routeParams[key] + "$1");
        });
        if (pubsub) {
            if (url.match(/fk/)) {
                let /** @type {?} */ arr = url.split('/');
                arr.pop();
                url = arr.join('/');
            }
            let /** @type {?} */ event = (`[${method}]${url}`).replace(/\?/, '');
            let /** @type {?} */ subject = new Subject();
            this.connection.on(event, (res) => subject.next(res));
            return subject.asObservable();
        }
        else {
            // Headers to be sent
            let /** @type {?} */ headers = new Headers();
            headers.append('Content-Type', 'application/json');
            // Authenticate request
            this.authenticate(url, headers);
            // Body fix for built in remote methods using "data", "options" or "credentials
            // that are the actual body, Custom remote method properties are different and need
            // to be wrapped into a body object
            let /** @type {?} */ body;
            let /** @type {?} */ postBodyKeys = typeof postBody === 'object' ? Object.keys(postBody) : [];
            if (postBodyKeys.length === 1) {
                body = postBody[postBodyKeys.shift()];
            }
            else {
                body = postBody;
            }
            let /** @type {?} */ filter = '';
            // Separate filter object from url params and add to search query
            if (urlParams.filter) {
                if (LoopBackConfig.isHeadersFilteringSet()) {
                    headers.append('filter', JSON.stringify(urlParams.filter));
                }
                else {
                    filter = `?filter=${encodeURIComponent(JSON.stringify(urlParams.filter))}`;
                }
                delete urlParams.filter;
            }
            // Separate where object from url params and add to search query
            /**
                  CODE BELOW WILL GENERATE THE FOLLOWING ISSUES:
                  - https://github.com/mean-expert-official/loopback-sdk-builder/issues/356
                  - https://github.com/mean-expert-official/loopback-sdk-builder/issues/328
                  if (urlParams.where) {
                    headers.append('where', JSON.stringify(urlParams.where));
                    delete urlParams.where;
                  }
                  **/
            if (typeof customHeaders === 'function') {
                headers = customHeaders(headers);
            }
            this.searchParams.setJSON(urlParams);
            let /** @type {?} */ request = new Request(new RequestOptions({
                headers: headers,
                method: method,
                url: `${url}${filter}`,
                search: Object.keys(urlParams).length > 0 ? this.searchParams.getURLSearchParams() : null,
                body: body ? JSON.stringify(body) : undefined,
                withCredentials: LoopBackConfig.getRequestOptionsCredentials()
            }));
            return this.http.request(request)
                .map((res) => (res.text() != "" ? res.json() : {}))
                .catch((e) => this.errorHandler.handleError(e));
        }
    }
    /**
     * \@method authenticate
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * \@description
     * This method will try to authenticate using either an access_token or basic http auth
     * @template T
     * @param {?} url Server URL
     * @param {?} headers HTTP Headers
     * @return {?}
     */
    authenticate(url, headers) {
        if (this.auth.getAccessTokenId()) {
            headers.append('Authorization', LoopBackConfig.getAuthPrefix() + this.auth.getAccessTokenId());
        }
    }
    /**
     * \@method create
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * \@description
     * Generic create method
     * @template T
     * @param {?} data Generic data type
     * @param {?=} customHeaders
     * @return {?}
     */
    create(data, customHeaders) {
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, undefined, { data }, null, customHeaders).map((data) => this.model.factory(data));
    }
    /**
     * \@method onCreate
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * \@description
     * Generic pubsub oncreate many method
     * @template T
     * @param {?} data Generic data type array
     * @return {?}
     */
    onCreate(data) {
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, undefined, { data }, true)
            .map((datum) => datum.map((data) => this.model.factory(data)));
    }
    /**
     * \@method createMany
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * \@description
     * Generic create many method
     * @template T
     * @param {?} data Generic data type array
     * @param {?=} customHeaders
     * @return {?}
     */
    createMany(data, customHeaders) {
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, undefined, { data }, null, customHeaders)
            .map((datum) => datum.map((data) => this.model.factory(data)));
    }
    /**
     * \@method onCreateMany
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * \@description
     * Generic create many method
     * @template T
     * @param {?} data Generic data type array
     * @return {?}
     */
    onCreateMany(data) {
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, undefined, { data }, true)
            .map((datum) => datum.map((data) => this.model.factory(data)));
    }
    /**
     * \@method findById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * \@description
     * Generic findById method
     * @template T
     * @param {?} id
     * @param {?=} filter
     * @param {?=} customHeaders
     * @return {?}
     */
    findById(id, filter = {}, customHeaders) {
        let /** @type {?} */ _urlParams = {};
        if (filter)
            _urlParams.filter = filter;
        return this.request('GET', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id }, _urlParams, undefined, null, customHeaders)
            .map((data) => this.model.factory(data));
    }
    /**
     * \@method find
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * \@description
     * Generic find method
     * @template T
     * @param {?=} filter
     * @param {?=} customHeaders
     * @return {?}
     */
    find(filter = {}, customHeaders) {
        return this.request('GET', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, { filter }, undefined, null, customHeaders)
            .map((datum) => datum.map((data) => this.model.factory(data)));
    }
    /**
     * \@method exists
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * \@description
     * Generic exists method
     * @template T
     * @param {?} id
     * @param {?=} customHeaders
     * @return {?}
     */
    exists(id, customHeaders) {
        return this.request('GET', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id/exists'
        ].join('/'), { id }, undefined, undefined, null, customHeaders);
    }
    /**
     * \@method findOne
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * \@description
     * Generic findOne method
     * @template T
     * @param {?=} filter
     * @param {?=} customHeaders
     * @return {?}
     */
    findOne(filter = {}, customHeaders) {
        return this.request('GET', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'findOne'
        ].join('/'), undefined, { filter }, undefined, null, customHeaders)
            .map((data) => this.model.factory(data));
    }
    /**
     * \@method updateAll
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * \@description
     * Generic updateAll method
     * @template T
     * @param {?=} where
     * @param {?=} data
     * @param {?=} customHeaders
     * @return {?}
     */
    updateAll(where = {}, data, customHeaders) {
        let /** @type {?} */ _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'update'
        ].join('/'), undefined, _urlParams, { data }, null, customHeaders);
    }
    /**
     * \@method onUpdateAll
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * \@description
     * Generic pubsub onUpdateAll method
     * @template T
     * @param {?=} where
     * @param {?=} data
     * @return {?}
     */
    onUpdateAll(where = {}, data) {
        let /** @type {?} */ _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'update'
        ].join('/'), undefined, _urlParams, { data }, true);
    }
    /**
     * \@method deleteById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * \@description
     * Generic deleteById method
     * @template T
     * @param {?} id
     * @param {?=} customHeaders
     * @return {?}
     */
    deleteById(id, customHeaders) {
        return this.request('DELETE', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id }, undefined, undefined, null, customHeaders)
            .map((data) => this.model.factory(data));
    }
    /**
     * \@method onDeleteById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * \@description
     * Generic pubsub onDeleteById method
     * @template T
     * @param {?} id
     * @return {?}
     */
    onDeleteById(id) {
        return this.request('DELETE', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id }, undefined, undefined, true).map((data) => this.model.factory(data));
    }
    /**
     * \@method count
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * \@description
     * Generic count method
     * @param {?=} where
     * @param {?=} customHeaders
     * @return {?}
     */
    count(where = {}, customHeaders) {
        let /** @type {?} */ _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('GET', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'count'
        ].join('/'), undefined, _urlParams, undefined, null, customHeaders);
    }
    /**
     * \@method updateAttributes
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * \@description
     * Generic updateAttributes method
     * @template T
     * @param {?} id
     * @param {?} data
     * @param {?=} customHeaders
     * @return {?}
     */
    updateAttributes(id, data, customHeaders) {
        return this.request('PUT', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id }, undefined, { data }, null, customHeaders)
            .map((data) => this.model.factory(data));
    }
    /**
     * \@method onUpdateAttributes
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * \@description
     * Generic onUpdateAttributes method
     * @template T
     * @param {?} id
     * @param {?} data
     * @return {?}
     */
    onUpdateAttributes(id, data) {
        return this.request('PUT', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id }, undefined, { data }, true).map((data) => this.model.factory(data));
    }
    /**
     * \@method upsert
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * \@description
     * Generic upsert method
     * @template T
     * @param {?=} data
     * @param {?=} customHeaders
     * @return {?}
     */
    upsert(data = {}, customHeaders) {
        return this.request('PUT', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
        ].join('/'), undefined, undefined, { data }, null, customHeaders)
            .map((data) => this.model.factory(data));
    }
    /**
     * \@method onUpsert
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * \@description
     * Generic pubsub onUpsert method
     * @template T
     * @param {?=} data
     * @return {?}
     */
    onUpsert(data = {}) {
        return this.request('PUT', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
        ].join('/'), undefined, undefined, { data }, true).map((data) => this.model.factory(data));
    }
    /**
     * \@method upsertPatch
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * \@description
     * Generic upsert method using patch http method
     * @template T
     * @param {?=} data
     * @param {?=} customHeaders
     * @return {?}
     */
    upsertPatch(data = {}, customHeaders) {
        return this.request('PATCH', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
        ].join('/'), undefined, undefined, { data }, null, customHeaders)
            .map((data) => this.model.factory(data));
    }
    /**
     * \@method onUpsertPatch
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * \@description
     * Generic pubsub onUpsertPatch method using patch http method
     * @template T
     * @param {?=} data
     * @return {?}
     */
    onUpsertPatch(data = {}) {
        return this.request('PATCH', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
        ].join('/'), undefined, undefined, { data }, true).map((data) => this.model.factory(data));
    }
    /**
     * \@method upsertWithWhere
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * \@description
     * Generic upsertWithWhere method
     * @template T
     * @param {?=} where
     * @param {?=} data
     * @param {?=} customHeaders
     * @return {?}
     */
    upsertWithWhere(where = {}, data = {}, customHeaders) {
        let /** @type {?} */ _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'upsertWithWhere'
        ].join('/'), undefined, _urlParams, { data }, null, customHeaders)
            .map((data) => this.model.factory(data));
    }
    /**
     * \@method onUpsertWithWhere
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * \@description
     * Generic pubsub onUpsertWithWhere method
     * @template T
     * @param {?=} where
     * @param {?=} data
     * @return {?}
     */
    onUpsertWithWhere(where = {}, data = {}) {
        let /** @type {?} */ _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'upsertWithWhere'
        ].join('/'), undefined, _urlParams, { data }, true).map((data) => this.model.factory(data));
    }
    /**
     * \@method replaceOrCreate
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * \@description
     * Generic replaceOrCreate method
     * @template T
     * @param {?=} data
     * @param {?=} customHeaders
     * @return {?}
     */
    replaceOrCreate(data = {}, customHeaders) {
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'replaceOrCreate'
        ].join('/'), undefined, undefined, { data }, null, customHeaders)
            .map((data) => this.model.factory(data));
    }
    /**
     * \@method onReplaceOrCreate
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * \@description
     * Generic onReplaceOrCreate method
     * @template T
     * @param {?=} data
     * @return {?}
     */
    onReplaceOrCreate(data = {}) {
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'replaceOrCreate'
        ].join('/'), undefined, undefined, { data }, true).map((data) => this.model.factory(data));
    }
    /**
     * \@method replaceById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * \@description
     * Generic replaceById method
     * @template T
     * @param {?} id
     * @param {?=} data
     * @param {?=} customHeaders
     * @return {?}
     */
    replaceById(id, data = {}, customHeaders) {
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id', 'replace'
        ].join('/'), { id }, undefined, { data }, null, customHeaders)
            .map((data) => this.model.factory(data));
    }
    /**
     * \@method onReplaceById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * \@description
     * Generic onReplaceById method
     * @template T
     * @param {?} id
     * @param {?=} data
     * @return {?}
     */
    onReplaceById(id, data = {}) {
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id', 'replace'
        ].join('/'), { id }, undefined, { data }, true).map((data) => this.model.factory(data));
    }
    /**
     * \@method createChangeStream
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * \@description
     * Generic createChangeStream method
     * @return {?}
     */
    createChangeStream() {
        let /** @type {?} */ subject = new Subject();
        if (typeof EventSource !== 'undefined') {
            let /** @type {?} */ emit = (msg) => subject.next(JSON.parse(msg.data));
            var /** @type {?} */ source = new EventSource([
                LoopBackConfig.getPath(),
                LoopBackConfig.getApiVersion(),
                this.model.getModelDefinition().path,
                'change-stream'
            ].join('/'));
            source.addEventListener('data', emit);
            source.onerror = emit;
        }
        else {
            console.warn('SDK Builder: EventSource is not supported');
        }
        return subject.asObservable();
    }
}
BaseLoopBackApi.decorators = [
    { type: Injectable },
];
/** @nocollapse */
BaseLoopBackApi.ctorParameters = () => [
    { type: Http, decorators: [{ type: Inject, args: [Http,] },] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] },] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] },] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] },] },
    { type: JSONSearchParams, decorators: [{ type: Inject, args: [JSONSearchParams,] },] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @author Jonathan Casarrubias <twitter:\@johncasarrubias> <github:\@johncasarrubias>
 * \@module RealTime
 * @license MIT
 * \@description
 * This module is a real-time interface for using socket connections, its main purpose
 * is to make sure that when there is a valid connection, it will create instances
 * of the different real-time functionalities like FireLoop, PubSub and IO.
 *
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/* tslint:disable */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Api services for the `Admin` model.
 */
class AdminApi extends BaseLoopBackApi {
    /**
     * @param {?} http
     * @param {?} connection
     * @param {?} models
     * @param {?} auth
     * @param {?} searchParams
     * @param {?} errorHandler
     */
    constructor(http, connection, models, auth, searchParams, errorHandler) {
        super(http, connection, models, auth, searchParams, errorHandler);
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.searchParams = searchParams;
        this.errorHandler = errorHandler;
    }
    /**
     * Find a related item by id for accessTokens.
     *
     *  id Admin id
     *
     *  fk Foreign key for accessTokens
     *
     * @param {?} id
     * @param {?} fk
     * @param {?=} customHeaders
     * @return {?} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Admin` object.)
     * </em>
     */
    findByIdAccessTokens(id, fk, customHeaders) {
        let /** @type {?} */ _method = "GET";
        let /** @type {?} */ _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/Admins/:id/accessTokens/:fk";
        let /** @type {?} */ _routeParams = {
            id: id,
            fk: fk
        };
        let /** @type {?} */ _postBody = {};
        let /** @type {?} */ _urlParams = {};
        let /** @type {?} */ result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Delete a related item by id for accessTokens.
     *
     *  id Admin id
     *
     *  fk Foreign key for accessTokens
     *
     * @param {?} id
     * @param {?} fk
     * @param {?=} customHeaders
     * @return {?} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    destroyByIdAccessTokens(id, fk, customHeaders) {
        let /** @type {?} */ _method = "DELETE";
        let /** @type {?} */ _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/Admins/:id/accessTokens/:fk";
        let /** @type {?} */ _routeParams = {
            id: id,
            fk: fk
        };
        let /** @type {?} */ _postBody = {};
        let /** @type {?} */ _urlParams = {};
        let /** @type {?} */ result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Update a related item by id for accessTokens.
     *
     *  id Admin id
     *
     *  fk Foreign key for accessTokens
     *
     *  data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @param {?} id
     * @param {?} fk
     * @param {?=} data
     * @param {?=} customHeaders
     * @return {?} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Admin` object.)
     * </em>
     */
    updateByIdAccessTokens(id, fk, data = {}, customHeaders) {
        let /** @type {?} */ _method = "PUT";
        let /** @type {?} */ _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/Admins/:id/accessTokens/:fk";
        let /** @type {?} */ _routeParams = {
            id: id,
            fk: fk
        };
        let /** @type {?} */ _postBody = {
            data: data
        };
        let /** @type {?} */ _urlParams = {};
        let /** @type {?} */ result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Queries accessTokens of Admin.
     *
     *  id Admin id
     *
     *  filter
     *
     * @param {?} id
     * @param {?=} filter
     * @param {?=} customHeaders
     * @return {?} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Admin` object.)
     * </em>
     */
    getAccessTokens(id, filter = {}, customHeaders) {
        let /** @type {?} */ _method = "GET";
        let /** @type {?} */ _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/Admins/:id/accessTokens";
        let /** @type {?} */ _routeParams = {
            id: id
        };
        let /** @type {?} */ _postBody = {};
        let /** @type {?} */ _urlParams = {};
        if (typeof filter !== 'undefined' && filter !== null)
            _urlParams.filter = filter;
        let /** @type {?} */ result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Creates a new instance in accessTokens of this model.
     *
     *  id Admin id
     *
     *  data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @param {?} id
     * @param {?=} data
     * @param {?=} customHeaders
     * @return {?} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Admin` object.)
     * </em>
     */
    createAccessTokens(id, data = {}, customHeaders) {
        let /** @type {?} */ _method = "POST";
        let /** @type {?} */ _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/Admins/:id/accessTokens";
        let /** @type {?} */ _routeParams = {
            id: id
        };
        let /** @type {?} */ _postBody = {
            data: data
        };
        let /** @type {?} */ _urlParams = {};
        let /** @type {?} */ result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Deletes all accessTokens of this model.
     *
     *  id Admin id
     *
     * @param {?} id
     * @param {?=} customHeaders
     * @return {?} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    deleteAccessTokens(id, customHeaders) {
        let /** @type {?} */ _method = "DELETE";
        let /** @type {?} */ _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/Admins/:id/accessTokens";
        let /** @type {?} */ _routeParams = {
            id: id
        };
        let /** @type {?} */ _postBody = {};
        let /** @type {?} */ _urlParams = {};
        let /** @type {?} */ result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Counts accessTokens of Admin.
     *
     *  id Admin id
     *
     *  where Criteria to match model instances
     *
     * @param {?} id
     * @param {?=} where
     * @param {?=} customHeaders
     * @return {?} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * Data properties:
     *
     *  - `count` – `{number}` -
     */
    countAccessTokens(id, where = {}, customHeaders) {
        let /** @type {?} */ _method = "GET";
        let /** @type {?} */ _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/Admins/:id/accessTokens/count";
        let /** @type {?} */ _routeParams = {
            id: id
        };
        let /** @type {?} */ _postBody = {};
        let /** @type {?} */ _urlParams = {};
        if (typeof where !== 'undefined' && where !== null)
            _urlParams.where = where;
        let /** @type {?} */ result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Patch an existing model instance or insert a new one into the data source.
     *
     *  data Request data.
     *
     *  - `data` – `{object}` - Model instance data
     *
     * @param {?=} data
     * @param {?=} customHeaders
     * @return {?} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Admin` object.)
     * </em>
     */
    patchOrCreate(data = {}, customHeaders) {
        let /** @type {?} */ _method = "PATCH";
        let /** @type {?} */ _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/Admins";
        let /** @type {?} */ _routeParams = {};
        let /** @type {?} */ _postBody = {
            data: data
        };
        let /** @type {?} */ _urlParams = {};
        let /** @type {?} */ result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Patch attributes for a model instance and persist it into the data source.
     *
     *  id Admin id
     *
     *  data Request data.
     *
     *  - `data` – `{object}` - An object of model property name/value pairs
     *
     * @param {?} id
     * @param {?=} data
     * @param {?=} customHeaders
     * @return {?} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Admin` object.)
     * </em>
     */
    patchAttributes(id, data = {}, customHeaders) {
        let /** @type {?} */ _method = "PATCH";
        let /** @type {?} */ _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/Admins/:id";
        let /** @type {?} */ _routeParams = {
            id: id
        };
        let /** @type {?} */ _postBody = {
            data: data
        };
        let /** @type {?} */ _urlParams = {};
        let /** @type {?} */ result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Login a user with username/email and password.
     *
     * @param {?} credentials
     * @param {?=} include Related objects to include in the response. See the description of return value for more details.
     *   Default value: `user`.
     *
     *  - `rememberMe` - `boolean` - Whether the authentication credentials
     *     should be remembered in localStorage across app/browser restarts.
     *     Default: `true`.
     *
     *  data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @param {?=} rememberMe
     * @param {?=} customHeaders
     * @return {?} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * El cuerpo de respuesta contiene propiedades de la AccessToken creada durante el inicio de la sesión.
     * Dependiendo del valor del parámetro `include`, el cuerpo puede contener propiedades adicionales:
     *
     *   - `user` - `U+007BUserU+007D` - Datos del usuario conectado actualmente. (`include=user`)
     *
     *
     */
    login(credentials, include = 'user', rememberMe = true, customHeaders) {
        let /** @type {?} */ _method = "POST";
        let /** @type {?} */ _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/Admins/login";
        let /** @type {?} */ _routeParams = {};
        let /** @type {?} */ _postBody = {
            credentials: credentials
        };
        let /** @type {?} */ _urlParams = {};
        if (typeof include !== 'undefined' && include !== null)
            _urlParams.include = include;
        let /** @type {?} */ result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders)
            .map((response) => {
            response.ttl = parseInt(response.ttl);
            response.rememberMe = rememberMe;
            this.auth.setToken(response);
            return response;
        });
        return result;
    }
    /**
     * Logout a user with access token.
     *
     *  data Request data.
     *
     * This method does not accept any data. Supply an empty object.
     *
     * @param {?=} customHeaders
     * @return {?} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    logout(customHeaders) {
        let /** @type {?} */ _method = "POST";
        let /** @type {?} */ _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/Admins/logout";
        let /** @type {?} */ _routeParams = {};
        let /** @type {?} */ _postBody = {};
        let /** @type {?} */ _urlParams = {};
        _urlParams.access_token = this.auth.getAccessTokenId();
        this.auth.clear();
        let /** @type {?} */ result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Trigger user's identity verification with configured verifyOptions
     *
     *  id Admin id
     *
     *  data Request data.
     *
     * This method does not accept any data. Supply an empty object.
     *
     * @param {?} id
     * @param {?=} customHeaders
     * @return {?} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    verify(id, customHeaders) {
        let /** @type {?} */ _method = "POST";
        let /** @type {?} */ _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/Admins/:id/verify";
        let /** @type {?} */ _routeParams = {
            id: id
        };
        let /** @type {?} */ _postBody = {};
        let /** @type {?} */ _urlParams = {};
        let /** @type {?} */ result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Confirm a user registration with identity verification token.
     *
     * @param {?} uid
     *
     * @param {?} token
     *
     * @param {?=} redirect
     *
     * @param {?=} customHeaders
     * @return {?} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    confirm(uid, token, redirect = {}, customHeaders) {
        let /** @type {?} */ _method = "GET";
        let /** @type {?} */ _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/Admins/confirm";
        let /** @type {?} */ _routeParams = {};
        let /** @type {?} */ _postBody = {};
        let /** @type {?} */ _urlParams = {};
        if (typeof uid !== 'undefined' && uid !== null)
            _urlParams.uid = uid;
        if (typeof token !== 'undefined' && token !== null)
            _urlParams.token = token;
        if (typeof redirect !== 'undefined' && redirect !== null)
            _urlParams.redirect = redirect;
        let /** @type {?} */ result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Reset password for a user with email.
     *
     *  data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @param {?} options
     * @param {?=} customHeaders
     * @return {?} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    resetPassword(options, customHeaders) {
        let /** @type {?} */ _method = "POST";
        let /** @type {?} */ _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/Admins/reset";
        let /** @type {?} */ _routeParams = {};
        let /** @type {?} */ _postBody = {
            options: options
        };
        let /** @type {?} */ _urlParams = {};
        let /** @type {?} */ result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Change a user's password.
     *
     *  data Request data.
     *
     *  - `oldPassword` – `{string}` -
     *
     *  - `newPassword` – `{string}` -
     *
     * @param {?} oldPassword
     * @param {?} newPassword
     * @param {?=} customHeaders
     * @return {?} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    changePassword(oldPassword, newPassword, customHeaders) {
        let /** @type {?} */ _method = "POST";
        let /** @type {?} */ _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/Admins/change-password";
        let /** @type {?} */ _routeParams = {};
        let /** @type {?} */ _postBody = {
            data: {
                oldPassword: oldPassword,
                newPassword: newPassword
            }
        };
        let /** @type {?} */ _urlParams = {};
        let /** @type {?} */ result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Reset user's password via a password-reset token.
     *
     *  data Request data.
     *
     *  - `newPassword` – `{string}` -
     *
     * @param {?} newPassword
     * @param {?=} customHeaders
     * @return {?} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    setPassword(newPassword, customHeaders) {
        let /** @type {?} */ _method = "POST";
        let /** @type {?} */ _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/Admins/reset-password";
        let /** @type {?} */ _routeParams = {};
        let /** @type {?} */ _postBody = {
            data: {
                newPassword: newPassword
            }
        };
        let /** @type {?} */ _urlParams = {};
        let /** @type {?} */ result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Creates a new instance in accessTokens of this model.
     *
     *  id Admin id
     *
     *  data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @param {?} id
     * @param {?=} data
     * @param {?=} customHeaders
     * @return {?} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Admin` object.)
     * </em>
     */
    createManyAccessTokens(id, data = [], customHeaders) {
        let /** @type {?} */ _method = "POST";
        let /** @type {?} */ _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/Admins/:id/accessTokens";
        let /** @type {?} */ _routeParams = {
            id: id
        };
        let /** @type {?} */ _postBody = {
            data: data
        };
        let /** @type {?} */ _urlParams = {};
        let /** @type {?} */ result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * \@ngdoc method
     * \@name sdk.Admin#getCurrent
     * \@methodOf sdk.Admin
     *
     * \@description
     *
     * Get data of the currently logged user. Fail with HTTP result 401
     * when there is no user logged in.
     *
     * @param {?=} filter
     * @return {?} object An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     */
    getCurrent(filter = {}) {
        let /** @type {?} */ _method = "GET";
        let /** @type {?} */ _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() + "/Admins" + "/:id";
        let /** @type {?} */ id = this.auth.getCurrentUserId();
        if (id == null)
            id = '__anonymous__';
        let /** @type {?} */ _routeParams = { id: id };
        let /** @type {?} */ _urlParams = {};
        let /** @type {?} */ _postBody = {};
        if (filter)
            _urlParams.filter = filter;
        return this.request(_method, _url, _routeParams, _urlParams, _postBody);
    }
    /**
     * Get data of the currently logged user that was returned by the last
     * call to {\@link sdk.Admin#login} or
     * {\@link sdk.Admin#getCurrent}. Return null when there
     * is no user logged in or the data of the current user were not fetched
     * yet.
     *
     * @return {?} object An Account instance.
     */
    getCachedCurrent() {
        return this.auth.getCurrentUserData();
    }
    /**
     * Get data of the currently logged access tokern that was returned by the last
     * call to {\@link sdk.Admin#login}
     *
     * @return {?} object An AccessToken instance.
     */
    getCurrentToken() {
        return this.auth.getToken();
    }
    /**
     * \@name sdk.Admin#isAuthenticated
     *
     * @return {?}
     */
    isAuthenticated() {
        return !(this.getCurrentId() === '' || this.getCurrentId() == null || this.getCurrentId() == 'null');
    }
    /**
     * \@name sdk.Admin#getCurrentId
     *
     * @return {?} object Id of the currently logged-in user or null.
     */
    getCurrentId() {
        return this.auth.getCurrentUserId();
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `Admin`.
     * @return {?}
     */
    getModelName() {
        return "Admin";
    }
}
AdminApi.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AdminApi.ctorParameters = () => [
    { type: Http, decorators: [{ type: Inject, args: [Http,] },] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] },] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] },] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] },] },
    { type: JSONSearchParams, decorators: [{ type: Inject, args: [JSONSearchParams,] },] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @author Jonathan Casarrubias <twitter:\@johncasarrubias> <github:\@johncasarrubias>
 * \@module LoggerService
 * @license MIT
 * \@description
 * Console Log wrapper that can be disabled in production mode
 *
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/* tslint:disable */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/* tslint:disable */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ApiLoguedGuard {
    /**
     * @param {?} auth
     * @param {?} userApi
     */
    constructor(auth, userApi) {
        this.auth = auth;
        this.userApi = userApi;
    }
    /**
     * @param {?} next
     * @param {?} state
     * @return {?}
     */
    canActivate(next, state) {
        if (!ApiLoguedGuard.valid) {
            const /** @type {?} */ user = this.auth.getCurrentUserData();
            const /** @type {?} */ token = this.auth.getToken();
            return this.userApi.getCurrent().toPromise().then(user => {
                ApiLoguedGuard.valid = true;
                return true;
            }, err => {
                return false;
            });
        }
        else {
            return true;
        }
    }
}
ApiLoguedGuard.valid = false;
ApiLoguedGuard.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ApiLoguedGuard.ctorParameters = () => [
    { type: LoopBackAuth, },
    { type: AdminApi, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const declarations = [
    ModelFormComponent,
    ApiRowComponent,
    ApiTableComponent,
    PaginatorComponent, CapitalizePipe, ModelSearchComponent
];
class LoopbackNgAdminModule {
}
LoopbackNgAdminModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    RouterModule,
                    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot()
                ],
                declarations: [...declarations],
                providers: [ApiLoguedGuard],
                exports: [...declarations]
            },] },
];
/** @nocollapse */
LoopbackNgAdminModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */

// unsupported: template constraints.
/**
 * @template Model, ModelApi
 */
class LoopbackApiLoaderComponent {
    /**
     * @param {?} loaderApi
     */
    constructor(loaderApi) {
        this.loaderApi = loaderApi;
        this.loaderConfig = {
            page: 0,
            limit: 15,
            order: 'date'
        };
        this.className = '';
        this.loaderPage = this.loaderConfig.page;
        this.loaderCount = 0;
        this.loaderSearch = { property: '', value: '' };
        this.loaderItemModel = User;
        this.modelProperties = {};
        this.modelDefinition = User.getModelDefinition();
        this.baseRoute = '/dashboard';
        this.createRoute = '/dashboard/topics/create';
        this.editRoute = '/dashboard/topics';
        this.apiRoute = '';
        this.loadModels();
        this.loadModel();
        this.loadRoutes();
    }
    /**
     * @return {?}
     */
    loadModels() {
        if (!LoopbackApiLoaderComponent.sdkModels) {
            LoopbackApiLoaderComponent.sdkModels = new SDKModels();
        }
    }
    /**
     * @return {?}
     */
    loadRoutes() {
        this.apiRoute = this.modelDefinition.path.toLowerCase();
        this.editRoute = `${this.baseRoute}/${this.apiRoute}`;
        this.createRoute = `${this.editRoute}/create`;
    }
    /**
     * @return {?}
     */
    loadModel() {
        this.loaderItemModel = LoopbackApiLoaderComponent.sdkModels.get(this.loaderApi.getModelName());
        this.modelDefinition = this.loaderItemModel.getModelDefinition();
        this.modelProperties = this.modelDefinition.properties;
    }
    /**
     * @return {?}
     */
    getFilter() {
        const /** @type {?} */ filter = { limit: this.loaderConfig.limit, skip: this.loaderConfig.limit * this.loaderPage };
        if (this.loaderSearch) {
            const /** @type {?} */ search = this.loaderSearch;
            const /** @type {?} */ name = search.property;
            if (search.property !== 'any') {
                filter['where'] = {};
                filter['where'][name] = { 'like': search.value, options: 'i' };
            }
            else {
                filter['where'] = this.getWhereAny(search.properties, search.value);
            }
        }
        return filter;
    }
    /**
     * @param {?} properties
     * @param {?} value
     * @return {?}
     */
    getWhereAny(properties, value) {
        const /** @type {?} */ where = { or: [] };
        for (let /** @type {?} */ i in properties) {
            const /** @type {?} */ name = properties[i];
            const /** @type {?} */ type = this.modelProperties[name].type;
            if (type != 'Date') {
                var /** @type {?} */ item = {};
                item[name] = { 'like': value, options: 'i' };
                where.or.push(item);
            }
        }
        return where;
    }
    /**
     * @return {?}
     */
    loadData() {
        this.loaderApi.find(this.getFilter()).toPromise().then((items) => {
            this.loaderItems = items;
        });
        this.loaderApi.count().toPromise().then(count => this.loaderCount = count.count).catch(this.handleError);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    apiSearch($event) {
        this.loaderSearch = $event;
        this.loadData();
    }
    /**
     * @param {?} error
     * @return {?}
     */
    handleError(error) {
        alert(error.message ? error.message : error);
    }
    /**
     * @return {?}
     */
    nextPage() {
        this.loaderPage++;
        this.loadData();
    }
    /**
     * @return {?}
     */
    prevPage() {
        this.loaderPage--;
        this.loadData();
    }
}
LoopbackApiLoaderComponent.sdkModels = null;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// unsupported: template constraints.
/**
 * @template Model, ModelApi
 */
class LoopbackApiItemEditorComponent {
    /**
     * @param {?} api
     * @param {?} route
     */
    constructor(api, route) {
        this.api = api;
        this.route = route;
        this.baseRoute = '/dashboard';
        const /** @type {?} */ model = this.api.getModel();
        this.item = new model();
        this.className = this.item.constructor.name;
        const /** @type {?} */ constr = this.item.constructor;
        this.backRoute = `${this.baseRoute}/${constr.getModelDefinition().path.toLowerCase()}`;
    }
    /**
     * @return {?}
     */
    loadParams() {
        this.route.params.subscribe(params => {
            if (params["id"]) {
                this.selectedId = params["id"];
                this.loadData();
            }
        });
    }
    /**
     * @return {?}
     */
    loadData() {
        return this.api.findById(this.selectedId).toPromise().then((item) => this.item = item).catch(this.handleError);
    }
    /**
     * @param {?} error
     * @return {?}
     */
    handleError(error) {
        alert(error.message);
    }
    /**
     * @return {?}
     */
    createItem() {
        return this.api.create(this.item).toPromise().catch(this.handleError);
    }
    /**
     * @return {?}
     */
    editItem() {
        return this.api.upsert(this.item).toPromise().catch(this.handleError);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onSubmit($event) {
        this.item = $event;
        let /** @type {?} */ promise = this.api.create(this.item).toPromise();
        if (this.item['id']) {
            promise = this.api.upsert(this.item).toPromise();
        }
        promise.then((item) => {
            this.item = item;
            alert('Element modified');
        }).catch(this.handleError);
    }
    /**
     * @return {?}
     */
    removeItem() {
        const /** @type {?} */ resp = confirm("Are you sure you want to remove?");
        if (!resp)
            return;
        this.api.deleteById(this.item['id']).toPromise().then(item => { alert('item removed'); window.history.back(); }, this.handleError);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { LoopbackNgAdminModule, ApiTableComponent, ApiRowComponent, ModelFormComponent, ModelSearchComponent, PaginatorComponent, LoopbackApiLoaderComponent, LoopbackApiItemEditorComponent, ApiLoguedGuard, CapitalizePipe, ApiRowComponent as ɵb, ApiTableComponent as ɵc, ModelFormComponent as ɵa, ModelSearchComponent as ɵf, PaginatorComponent as ɵd, ApiLoguedGuard as ɵg, CapitalizePipe as ɵe, AdminApi as ɵi, LoopBackAuth as ɵh };
//# sourceMappingURL=loopback-ng-admin.js.map

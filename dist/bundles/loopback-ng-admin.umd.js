(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/add/observable/merge'), require('rxjs/Subject'), require('rxjs/Observable'), require('rxjs/add/operator/merge'), require('rxjs/add/observable/throw'), require('@angular/http'), require('rxjs/add/operator/share'), require('rxjs/add/operator/catch'), require('rxjs/add/operator/map'), require('@angular/common'), require('@angular/forms'), require('@angular/router'), require('angular-froala-wysiwyg')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs/add/observable/merge', 'rxjs/Subject', 'rxjs/Observable', 'rxjs/add/operator/merge', 'rxjs/add/observable/throw', '@angular/http', 'rxjs/add/operator/share', 'rxjs/add/operator/catch', 'rxjs/add/operator/map', '@angular/common', '@angular/forms', '@angular/router', 'angular-froala-wysiwyg'], factory) :
	(factory((global['loopback-ng-admin'] = {}),global.ng.core,global.Rx.Observable,global.Rx,global.Rx,global.Rx.Observable.prototype,global.Rx.Observable,global.ng.http,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.ng.common,global.ng.forms,global.ng.router,global.angularFroalaWysiwyg));
}(this, (function (exports,core,merge,Subject,Observable,merge$1,_throw,http,share,_catch,map,common,forms,router,angularFroalaWysiwyg) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */
var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}









function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

var ApiTableComponent = /** @class */ (function () {
    function ApiTableComponent() {
        this.tableProperties = [];
    }
    ApiTableComponent.prototype.ngOnInit = function () {
        this.tableModel = this.tableItems ? this.tableItems[0] : {};
        if (!this.properties) {
            this.readPropertiesDefault();
        }
        else {
            this.readArrProperties();
        }
    };
    ApiTableComponent.prototype.readArrProperties = function () {
        var props = this.getProps();
        for (var i in props) {
            if (this.properties.includes(i)) {
                this.tableProperties.push(props[i]);
            }
        }
    };
    ApiTableComponent.prototype.getProps = function () {
        return this.tableModel.constructor.getModelDefinition().properties;
    };
    ApiTableComponent.prototype.readPropertiesDefault = function () {
        this.tableProperties = [];
        var props = this.getProps();
        for (var i in props) {
            this.tableProperties.push(props[i]);
        }
    };
    return ApiTableComponent;
}());
ApiTableComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'app-api-table',
                template: "<table class=\"table table-hover table-sm\">\n  <thead>\n    <tr>\n      <th *ngFor=\"let item of tableProperties\" class=\"text-capitalize\" scope=\"col\"> {{item.name}}</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr [routerLink]=\"[route, item.id]\" app-api-row *ngFor=\"let item of tableItems\" [rowItem]=\"item\" [tableProperties]=\"tableProperties\">\n    </tr>\n  </tbody>\n</table>\n",
                styles: [""]
            },] },
];
ApiTableComponent.ctorParameters = function () { return []; };
ApiTableComponent.propDecorators = {
    "tableItems": [{ type: core.Input },],
    "properties": [{ type: core.Input },],
    "route": [{ type: core.Input },],
};
var ApiRowComponent = /** @class */ (function () {
    function ApiRowComponent() {
    }
    ApiRowComponent.prototype.ngOnInit = function () {
    };
    return ApiRowComponent;
}());
ApiRowComponent.decorators = [
    { type: core.Component, args: [{
                selector: '[app-api-row]',
                template: "<td *ngFor=\"let prop of tableProperties\" >\n  <div [ngSwitch]=\"prop.name.toLowerCase()\">\n    <span *ngSwitchCase=\"'date'\">\n      {{rowItem[prop.name] | date}}\n    </span>\n    <span *ngSwitchDefault>\n      {{rowItem[prop.name]}}\n    </span>\n  </div>\n</td>\n<td>\n</td>\n",
                styles: [""]
            },] },
];
ApiRowComponent.ctorParameters = function () { return []; };
ApiRowComponent.propDecorators = {
    "rowItem": [{ type: core.Input },],
    "tableProperties": [{ type: core.Input },],
};
var ModelFormComponent = /** @class */ (function () {
    function ModelFormComponent() {
        this.formProperties = [];
        this.onSubmit = new core.EventEmitter();
    }
    ModelFormComponent.prototype.ngOnInit = function () {
    };
    Object.defineProperty(ModelFormComponent.prototype, "model", {
        set: function (item) {
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
        },
        enumerable: true,
        configurable: true
    });
    ModelFormComponent.prototype.loadParamsFromModel = function () {
        var props = this.getProps();
        for (var i in props) {
            this.formProperties.push(props[i]);
        }
    };
    ModelFormComponent.prototype.loadParamsProperties = function () {
        var props = this.getProps();
        for (var i in props) {
            if (this.properties.includes(i)) {
                this.formProperties.push(props[i]);
            }
        }
    };
    ModelFormComponent.prototype.getProps = function () {
        return this.item.constructor.getModelDefinition().properties;
    };
    ModelFormComponent.prototype.getType = function (element) {
        return typeof (element);
    };
    ModelFormComponent.prototype.submitted = function () {
        this.onSubmit.emit(this.item);
    };
    return ModelFormComponent;
}());
ModelFormComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'app-model-form',
                template: "<div class=\"container\">\n  <ng-content select=\"[header]\"></ng-content>\n  <hr>\n  <form (ngSubmit)=\"submitted()\">\n    <ng-content select=\"[formTop]\"></ng-content>\n    <div class=\"form-group row\" *ngFor=\"let element of formProperties\">\n      <label for=\"staticEmail\" class=\"col-sm-2 col-form-label\">{{element.name}}</label>\n      <div class=\"col-sm-10\" [ngSwitch]=\"element.type\" *ngIf=\"element.name !='id'; else idInput\">\n        <input type=\"checkbox\" class=\"form-control\" [name]=\"element.name\" [(ngModel)]=\"item[element.name]\" *ngSwitchCase=\"'boolean'\">\n        <input type=\"email\" class=\"form-control\" [name]=\"element.name\" [(ngModel)]=\"item[element.name]\" *ngSwitchCase=\"'email'\">\n        <textarea class=\"form-control\" [name]=\"element.name\" [(ngModel)]=\"item[element.name]\" *ngSwitchCase=\"'textarea'\">\n        </textarea>\n        <div [froalaEditor] *ngSwitchCase=\"'rtext'\" [(froalaModel)]=\"item[element.name]\">\n          {{item[element.name]}}\n        </div>\n        <input type=\"text\" class=\"form-control\" [name]=\"element.name\" [(ngModel)]=\"item[element.name]\" *ngSwitchDefault>\n      </div>\n      <ng-template #idInput>\n        <div class=\"col-sm-10\">\n          <input type=\"text\" class=\"form-control\" [name]=\"element.name\" [(ngModel)]=\"item[element.name]\" readonly>\n        </div>\n      </ng-template>\n      <ng-content select=\"[form]\"></ng-content>\n    </div>\n    <div class=\"form-group row\">\n      <button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n      <ng-content select=\"[buttons]\"></ng-content>\n    </div>\n  </form>\n</div>\n",
                styles: [""]
            },] },
];
ModelFormComponent.ctorParameters = function () { return []; };
ModelFormComponent.propDecorators = {
    "properties": [{ type: core.Input },],
    "formProperties": [{ type: core.Input },],
    "name": [{ type: core.Input },],
    "onSubmit": [{ type: core.Output },],
    "model": [{ type: core.Input },],
};
var PaginatorComponent = /** @class */ (function () {
    function PaginatorComponent() {
        this.totalCount = 0;
        this.limit = 15;
        this.totalPages = 0;
        this.currentPage = 0;
        this.next = new core.EventEmitter();
        this.prev = new core.EventEmitter();
        this.pageSelected = new core.EventEmitter();
    }
    PaginatorComponent.prototype.ngOnInit = function () {
        this.totalPages = this.totalCount / this.limit;
    };
    PaginatorComponent.prototype.onNext = function () {
        this.currentPage += 1;
        this.next.emit(this.currentPage);
    };
    PaginatorComponent.prototype.onPrev = function () {
        this.currentPage -= 1;
        this.prev.emit(this.currentPage);
    };
    PaginatorComponent.prototype.isDisabled = function () {
        return (this.getLastNumber() >= this.totalCount);
    };
    PaginatorComponent.prototype.getLastNumber = function () {
        if (this.totalCount < this.limit) {
            return this.totalCount;
        }
        return (this.currentPage * this.limit) + this.limit;
    };
    return PaginatorComponent;
}());
PaginatorComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'app-paginator',
                template: "<nav aria-label=\"Page navigation example\">\n  {{1+(currentPage*limit)}}-{{getLastNumber()}} of {{totalCount}}\n  <ul class=\"pagination justify-content-end\">\n    <li class=\"page-item\" [class.disabled]=\"currentPage==0\">\n      <a class=\"page-link\" (click)=\"onPrev()\" tabindex=\"-1\">Previous</a>\n    </li>\n    <li class=\"page-item\" [class.disabled]=\"isDisabled()\">\n      <a class=\"page-link\" (click)=\"onNext()\">Next</a>\n    </li>\n  </ul>\n</nav>\n",
                styles: [""]
            },] },
];
PaginatorComponent.ctorParameters = function () { return []; };
PaginatorComponent.propDecorators = {
    "totalCount": [{ type: core.Input },],
    "limit": [{ type: core.Input },],
    "currentPage": [{ type: core.Input },],
    "next": [{ type: core.Output },],
    "prev": [{ type: core.Output },],
    "pageSelected": [{ type: core.Output },],
};
var CapitalizePipe = /** @class */ (function () {
    function CapitalizePipe() {
    }
    CapitalizePipe.prototype.transform = function (value, args) {
        return value[0].toUpperCase() + value.slice(1, value.length);
    };
    return CapitalizePipe;
}());
CapitalizePipe.decorators = [
    { type: core.Pipe, args: [{
                name: 'capitalize'
            },] },
];
CapitalizePipe.ctorParameters = function () { return []; };
var ModelSearchComponent = /** @class */ (function () {
    function ModelSearchComponent() {
        this.property = 'any';
        this.submitted = new core.EventEmitter();
    }
    ModelSearchComponent.prototype.ngOnInit = function () {
    };
    ModelSearchComponent.prototype.onSubmitted = function () {
        if (this.property === 'any') {
            this.searchAny();
        }
        else {
            this.searchProperty();
        }
    };
    ModelSearchComponent.prototype.searchProperty = function () {
        this.submitted.emit({
            property: this.property,
            value: this.text
        });
    };
    ModelSearchComponent.prototype.searchAny = function () {
        this.submitted.emit({
            property: this.property,
            value: this.text,
            properties: this.properties
        });
    };
    return ModelSearchComponent;
}());
ModelSearchComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'app-model-search',
                template: "<form>\n  <div class=\"form-row\">\n    <div class=\"col-md-2 mb-3\">\n      <select name=\"property\" [(ngModel)]=\"property\" name=\"property\" class=\"form-control\">\n        <option selected value=\"any\">Any</option>\n        <option class=\"text-capitalize\" *ngFor=\"let item of properties\" [value]=\"item\">{{item}}</option>\n      </select>\n    </div>\n    <div class=\"col-md-8 mb-7\">\n      <input type=\"text\" class=\"form-control\" [placeholder]=\"property\" required [(ngModel)]=\"text\" name=\"text\">\n    </div>\n    <div class=\"col-md-2 mb-2\">\n      <button class=\"btn btn-primary form-control\" (click)=\"onSubmitted()\">Search</button>\n    </div>\n  </div>\n</form>\n",
                styles: [""]
            },] },
];
ModelSearchComponent.ctorParameters = function () { return []; };
ModelSearchComponent.propDecorators = {
    "properties": [{ type: core.Input },],
    "submitted": [{ type: core.Output },],
};
var User = /** @class */ (function () {
    function User(data) {
        Object.assign(this, data);
    }
    User.getModelName = function () {
        return "User";
    };
    /**
     * \@method factory
     * @author Jonathan Casarrubias
     * @license MIT
     * This method creates an instance of User for dynamic purposes.
     *
     * @param {?} data
     * @return {?}
     */
    User.factory = function (data) {
        return new User(data);
    };
    /**
     * \@method getModelDefinition
     * @author Julien Ledun
     * @license MIT
     * This method returns an object that represents some of the model
     * definitions.
     *
     * @return {?}
     */
    User.getModelDefinition = function () {
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
    };
    return User;
}());
var Admin = /** @class */ (function () {
    function Admin(data) {
        Object.assign(this, data);
    }
    Admin.getModelName = function () {
        return "Admin";
    };
    /**
     * \@method factory
     * @author Jonathan Casarrubias
     * @license MIT
     * This method creates an instance of Admin for dynamic purposes.
     *
     * @param {?} data
     * @return {?}
     */
    Admin.factory = function (data) {
        return new Admin(data);
    };
    /**
     * \@method getModelDefinition
     * @author Julien Ledun
     * @license MIT
     * This method returns an object that represents some of the model
     * definitions.
     *
     * @return {?}
     */
    Admin.getModelDefinition = function () {
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
    };
    return Admin;
}());
var SDKToken = /** @class */ (function () {
    function SDKToken(data) {
        this.id = null;
        this.ttl = null;
        this.scopes = null;
        this.created = null;
        this.userId = null;
        this.user = null;
        this.rememberMe = null;
        Object.assign(this, data);
    }
    return SDKToken;
}());
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
 *  \@module Storage
 * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
 * @license MIT
 * \@description
 * The InternalStorage class is used for dependency injection swapping.
 * It will be provided using factory method from different sources.
 *
 */
var BaseStorage = /** @class */ (function () {
    function BaseStorage() {
    }
    BaseStorage.prototype.get = function (key) { };
    BaseStorage.prototype.set = function (key, value, expires) { };
    BaseStorage.prototype.remove = function (key) { };
    return BaseStorage;
}());
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
var InternalStorage = /** @class */ (function (_super) {
    __extends(InternalStorage, _super);
    function InternalStorage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return InternalStorage;
}(BaseStorage));
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
 * @author Jonathan Casarrubias <twitter:\@johncasarrubias> <github:\@mean-expert-official>
 * \@module SocketConnection
 * @license MIT
 * \@description
 * This module handle socket connections and return singleton instances for each
 * connection, it will use the SDK Socket Driver Available currently supporting
 * Angular 2 for web, NativeScript 2 and Angular Universal.
 *
 */
var LoopBackAuth = /** @class */ (function () {
    function LoopBackAuth(storage) {
        this.storage = storage;
        this.token = new SDKToken();
        this.prefix = '$LoopBackSDK$';
        this.token.id = this.load('id');
        this.token.user = this.load('user');
        this.token.userId = this.load('userId');
        this.token.created = this.load('created');
        this.token.ttl = this.load('ttl');
        this.token.rememberMe = this.load('rememberMe');
    }
    LoopBackAuth.prototype.setRememberMe = function (value) {
        this.token.rememberMe = value;
    };
    LoopBackAuth.prototype.setUser = function (user) {
        this.token.user = user;
        this.save();
    };
    LoopBackAuth.prototype.setToken = function (token) {
        this.token = Object.assign({}, this.token, token);
        this.save();
    };
    LoopBackAuth.prototype.getToken = function () {
        return (this.token);
    };
    LoopBackAuth.prototype.getAccessTokenId = function () {
        return this.token.id;
    };
    LoopBackAuth.prototype.getCurrentUserId = function () {
        return this.token.userId;
    };
    LoopBackAuth.prototype.getCurrentUserData = function () {
        return (typeof this.token.user === 'string') ? JSON.parse(this.token.user) : this.token.user;
    };
    LoopBackAuth.prototype.save = function () {
        var today = new Date();
        var expires = new Date(today.getTime() + (this.token.ttl * 1000));
        this.persist('id', this.token.id, expires);
        this.persist('user', this.token.user, expires);
        this.persist('userId', this.token.userId, expires);
        this.persist('created', this.token.created, expires);
        this.persist('ttl', this.token.ttl, expires);
        this.persist('rememberMe', this.token.rememberMe, expires);
        return true;
    };
    LoopBackAuth.prototype.load = function (prop) {
        return this.storage.get("" + this.prefix + prop);
    };
    LoopBackAuth.prototype.clear = function () {
        var _this = this;
        Object.keys(this.token).forEach(function (prop) { return _this.storage.remove("" + _this.prefix + prop); });
        this.token = new SDKToken();
    };
    LoopBackAuth.prototype.persist = function (prop, value, expires) {
        try {
            this.storage.set("" + this.prefix + prop, (typeof value === 'object') ? JSON.stringify(value) : value, this.token.rememberMe ? expires : null);
        }
        catch (err) {
            console.error('Cannot access local/session storage:', err);
        }
    };
    return LoopBackAuth;
}());
LoopBackAuth.decorators = [
    { type: core.Injectable },
];
LoopBackAuth.ctorParameters = function () { return [
    { type: InternalStorage, decorators: [{ type: core.Inject, args: [InternalStorage,] },] },
]; };
var ErrorHandler = /** @class */ (function () {
    function ErrorHandler() {
    }
    ErrorHandler.prototype.handleError = function (error) {
        return Observable.Observable.throw(error.json().error || 'Server error');
    };
    return ErrorHandler;
}());
ErrorHandler.decorators = [
    { type: core.Injectable },
];
ErrorHandler.ctorParameters = function () { return []; };
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
var JSONSearchParams = /** @class */ (function () {
    function JSONSearchParams() {
    }
    JSONSearchParams.prototype.setJSON = function (obj) {
        this._usp = new http.URLSearchParams(this._JSON2URL(obj, false));
    };
    JSONSearchParams.prototype.getURLSearchParams = function () {
        return this._usp;
    };
    JSONSearchParams.prototype._JSON2URL = function (obj, parent) {
        var parts = [];
        for (var key in obj)
            parts.push(this._parseParam(key, obj[key], parent));
        return parts.join('&');
    };
    JSONSearchParams.prototype._parseParam = function (key, value, parent) {
        var processedKey = parent ? parent + '[' + key + ']' : key;
        if (value && (((typeof value)) === 'object' || Array.isArray(value))) {
            return this._JSON2URL(value, processedKey);
        }
        return processedKey + '=' + value;
    };
    return JSONSearchParams;
}());
JSONSearchParams.decorators = [
    { type: core.Injectable },
];
JSONSearchParams.ctorParameters = function () { return []; };
var LoopBackConfig = /** @class */ (function () {
    function LoopBackConfig() {
    }
    LoopBackConfig.setApiVersion = function (version) {
        if (version === void 0) { version = 'api'; }
        LoopBackConfig.version = version;
    };
    LoopBackConfig.getApiVersion = function () {
        return LoopBackConfig.version;
    };
    LoopBackConfig.setBaseURL = function (url) {
        if (url === void 0) { url = '/'; }
        LoopBackConfig.path = url;
    };
    LoopBackConfig.getPath = function () {
        return LoopBackConfig.path;
    };
    LoopBackConfig.setAuthPrefix = function (authPrefix) {
        if (authPrefix === void 0) { authPrefix = ''; }
        LoopBackConfig.authPrefix = authPrefix;
    };
    LoopBackConfig.getAuthPrefix = function () {
        return LoopBackConfig.authPrefix;
    };
    LoopBackConfig.setDebugMode = function (isEnabled) {
        LoopBackConfig.debug = isEnabled;
    };
    LoopBackConfig.debuggable = function () {
        return LoopBackConfig.debug;
    };
    LoopBackConfig.filterOnUrl = function () {
        LoopBackConfig.filterOn = 'url';
    };
    LoopBackConfig.filterOnHeaders = function () {
        LoopBackConfig.filterOn = 'headers';
    };
    LoopBackConfig.isHeadersFilteringSet = function () {
        return (LoopBackConfig.filterOn === 'headers');
    };
    LoopBackConfig.setSecureWebSockets = function () {
        LoopBackConfig.secure = true;
    };
    LoopBackConfig.unsetSecureWebSockets = function () {
        LoopBackConfig.secure = false;
    };
    LoopBackConfig.isSecureWebSocketsSet = function () {
        return LoopBackConfig.secure;
    };
    LoopBackConfig.setRequestOptionsCredentials = function (withCredentials) {
        if (withCredentials === void 0) { withCredentials = false; }
        LoopBackConfig.withCredentials = withCredentials;
    };
    LoopBackConfig.getRequestOptionsCredentials = function () {
        return LoopBackConfig.withCredentials;
    };
    return LoopBackConfig;
}());
LoopBackConfig.path = '//0.0.0.0:3000';
LoopBackConfig.version = 'api';
LoopBackConfig.authPrefix = '';
LoopBackConfig.debug = true;
LoopBackConfig.filterOn = 'headers';
LoopBackConfig.secure = false;
LoopBackConfig.withCredentials = false;
var SDKModels = /** @class */ (function () {
    function SDKModels() {
        this.models = {
            User: User,
            Admin: Admin
        };
    }
    SDKModels.prototype.get = function (modelName) {
        return this.models[modelName];
    };
    SDKModels.prototype.getAll = function () {
        return this.models;
    };
    SDKModels.prototype.getModelNames = function () {
        return Object.keys(this.models);
    };
    return SDKModels;
}());
SDKModels.decorators = [
    { type: core.Injectable },
];
SDKModels.ctorParameters = function () { return []; };
/**
 *  \@module SocketDriver
 * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
 * @license MIT
 * \@description
 * The SocketDriver class is used for dependency injection swapping.
 * It will be provided using factory method from different sources.
 *
 */
var SocketDriver = /** @class */ (function () {
    function SocketDriver() {
    }
    SocketDriver.prototype.connect = function (url, options) { };
    return SocketDriver;
}());
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
var SocketConnection = /** @class */ (function () {
    function SocketConnection(driver, zone) {
        this.driver = driver;
        this.zone = zone;
        this.subjects = {
            onConnect: new Subject.Subject(),
            onDisconnect: new Subject.Subject(),
            onAuthenticated: new Subject.Subject(),
            onUnAuthorized: new Subject.Subject()
        };
        this.sharedObservables = {};
        this.authenticated = false;
        this.sharedObservables = {
            sharedOnConnect: this.subjects.onConnect.asObservable().share(),
            sharedOnDisconnect: this.subjects.onDisconnect.asObservable().share(),
            sharedOnAuthenticated: this.subjects.onAuthenticated.asObservable().share(),
            sharedOnUnAuthorized: this.subjects.onUnAuthorized.asObservable().share()
        };
        this.sharedObservables.sharedOnConnect.subscribe();
        this.sharedObservables.sharedOnDisconnect.subscribe();
        this.sharedObservables.sharedOnAuthenticated.subscribe();
        this.sharedObservables.sharedOnUnAuthorized.subscribe();
    }
    SocketConnection.prototype.connect = function (token) {
        var _this = this;
        if (token === void 0) { token = null; }
        if (!this.socket) {
            console.info('Creating a new connection with: ', LoopBackConfig.getPath());
            this.socket = this.driver.connect(LoopBackConfig.getPath(), {
                log: false,
                secure: LoopBackConfig.isSecureWebSocketsSet(),
                forceNew: true,
                forceWebsockets: true,
                transports: ['websocket']
            });
            this.on('connect', function () {
                _this.subjects.onConnect.next('connected');
                _this.emit('authentication', token);
            });
            this.on('authenticated', function () {
                _this.authenticated = true;
                _this.subjects.onAuthenticated.next();
                _this.heartbeater();
            });
            this.on('unauthorized', function (err) {
                _this.authenticated = false;
                _this.subjects.onUnAuthorized.next(err);
            });
            this.on('disconnect', function (status) { return _this.subjects.onDisconnect.next(status); });
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
    };
    SocketConnection.prototype.isConnected = function () {
        return (this.socket && this.socket.connected);
    };
    SocketConnection.prototype.on = function (event, handler) {
        var _this = this;
        this.socket.on(event, function (data) { return _this.zone.run(function () { return handler(data); }); });
    };
    SocketConnection.prototype.emit = function (event, data) {
        if (data) {
            this.socket.emit(event, data);
        }
        else {
            this.socket.emit(event);
        }
    };
    SocketConnection.prototype.removeListener = function (event, handler) {
        if (typeof this.socket.off === 'function') {
            this.socket.off(event, handler);
        }
    };
    SocketConnection.prototype.removeAllListeners = function (event) {
        if (typeof this.socket.removeAllListeners === 'function') {
            this.socket.removeAllListeners(event);
        }
    };
    SocketConnection.prototype.disconnect = function () {
        this.socket.disconnect();
    };
    SocketConnection.prototype.heartbeater = function () {
        var _this = this;
        var heartbeater = setInterval(function () {
            if (_this.isConnected()) {
                _this.socket.emit('lb-ping');
            }
            else {
                _this.socket.removeAllListeners('lb-pong');
                clearInterval(heartbeater);
            }
        }, 15000);
        this.socket.on('lb-pong', function (data) { return console.info('Heartbeat: ', data); });
    };
    return SocketConnection;
}());
SocketConnection.decorators = [
    { type: core.Injectable },
];
SocketConnection.ctorParameters = function () { return [
    { type: SocketDriver, decorators: [{ type: core.Inject, args: [SocketDriver,] },] },
    { type: core.NgZone, decorators: [{ type: core.Inject, args: [core.NgZone,] },] },
]; };
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
var BaseLoopBackApi = /** @class */ (function () {
    function BaseLoopBackApi(http$$1, connection, models, auth, searchParams, errorHandler) {
        this.http = http$$1;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.searchParams = searchParams;
        this.errorHandler = errorHandler;
        this.model = this.models.get(this.getModelName());
    }
    BaseLoopBackApi.prototype.getModel = function () {
        return this.model;
    };
    BaseLoopBackApi.prototype.request = function (method, url, routeParams, urlParams, postBody, pubsub, customHeaders) {
        var _this = this;
        if (routeParams === void 0) { routeParams = {}; }
        if (urlParams === void 0) { urlParams = {}; }
        if (postBody === void 0) { postBody = {}; }
        if (pubsub === void 0) { pubsub = false; }
        Object.keys(routeParams).forEach(function (key) {
            url = url.replace(new RegExp(":" + key + "(\/|$)", "g"), routeParams[key] + "$1");
        });
        if (pubsub) {
            if (url.match(/fk/)) {
                var arr = url.split('/');
                arr.pop();
                url = arr.join('/');
            }
            var event = ("[" + method + "]" + url).replace(/\?/, '');
            var subject_1 = new Subject.Subject();
            this.connection.on(event, function (res) { return subject_1.next(res); });
            return subject_1.asObservable();
        }
        else {
            var headers = new http.Headers();
            headers.append('Content-Type', 'application/json');
            this.authenticate(url, headers);
            var body = void 0;
            var postBodyKeys = typeof postBody === 'object' ? Object.keys(postBody) : [];
            if (postBodyKeys.length === 1) {
                body = postBody[postBodyKeys.shift()];
            }
            else {
                body = postBody;
            }
            var filter = '';
            if (urlParams.filter) {
                if (LoopBackConfig.isHeadersFilteringSet()) {
                    headers.append('filter', JSON.stringify(urlParams.filter));
                }
                else {
                    filter = "?filter=" + encodeURIComponent(JSON.stringify(urlParams.filter));
                }
                delete urlParams.filter;
            }
            if (typeof customHeaders === 'function') {
                headers = customHeaders(headers);
            }
            this.searchParams.setJSON(urlParams);
            var request = new http.Request(new http.RequestOptions({
                headers: headers,
                method: method,
                url: "" + url + filter,
                search: Object.keys(urlParams).length > 0 ? this.searchParams.getURLSearchParams() : null,
                body: body ? JSON.stringify(body) : undefined,
                withCredentials: LoopBackConfig.getRequestOptionsCredentials()
            }));
            return this.http.request(request)
                .map(function (res) { return (res.text() != "" ? res.json() : {}); })
                .catch(function (e) { return _this.errorHandler.handleError(e); });
        }
    };
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
    BaseLoopBackApi.prototype.authenticate = function (url, headers) {
        if (this.auth.getAccessTokenId()) {
            headers.append('Authorization', LoopBackConfig.getAuthPrefix() + this.auth.getAccessTokenId());
        }
    };
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
    BaseLoopBackApi.prototype.create = function (data, customHeaders) {
        var _this = this;
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, undefined, { data: data }, null, customHeaders).map(function (data) { return _this.model.factory(data); });
    };
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
    BaseLoopBackApi.prototype.onCreate = function (data) {
        var _this = this;
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, undefined, { data: data }, true)
            .map(function (datum) { return datum.map(function (data) { return _this.model.factory(data); }); });
    };
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
    BaseLoopBackApi.prototype.createMany = function (data, customHeaders) {
        var _this = this;
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, undefined, { data: data }, null, customHeaders)
            .map(function (datum) { return datum.map(function (data) { return _this.model.factory(data); }); });
    };
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
    BaseLoopBackApi.prototype.onCreateMany = function (data) {
        var _this = this;
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, undefined, { data: data }, true)
            .map(function (datum) { return datum.map(function (data) { return _this.model.factory(data); }); });
    };
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
    BaseLoopBackApi.prototype.findById = function (id, filter, customHeaders) {
        var _this = this;
        if (filter === void 0) { filter = {}; }
        var _urlParams = {};
        if (filter)
            _urlParams.filter = filter;
        return this.request('GET', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id: id }, _urlParams, undefined, null, customHeaders)
            .map(function (data) { return _this.model.factory(data); });
    };
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
    BaseLoopBackApi.prototype.find = function (filter, customHeaders) {
        var _this = this;
        if (filter === void 0) { filter = {}; }
        return this.request('GET', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, { filter: filter }, undefined, null, customHeaders)
            .map(function (datum) { return datum.map(function (data) { return _this.model.factory(data); }); });
    };
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
    BaseLoopBackApi.prototype.exists = function (id, customHeaders) {
        return this.request('GET', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id/exists'
        ].join('/'), { id: id }, undefined, undefined, null, customHeaders);
    };
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
    BaseLoopBackApi.prototype.findOne = function (filter, customHeaders) {
        var _this = this;
        if (filter === void 0) { filter = {}; }
        return this.request('GET', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'findOne'
        ].join('/'), undefined, { filter: filter }, undefined, null, customHeaders)
            .map(function (data) { return _this.model.factory(data); });
    };
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
    BaseLoopBackApi.prototype.updateAll = function (where, data, customHeaders) {
        if (where === void 0) { where = {}; }
        var _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'update'
        ].join('/'), undefined, _urlParams, { data: data }, null, customHeaders);
    };
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
    BaseLoopBackApi.prototype.onUpdateAll = function (where, data) {
        if (where === void 0) { where = {}; }
        var _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'update'
        ].join('/'), undefined, _urlParams, { data: data }, true);
    };
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
    BaseLoopBackApi.prototype.deleteById = function (id, customHeaders) {
        var _this = this;
        return this.request('DELETE', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id: id }, undefined, undefined, null, customHeaders)
            .map(function (data) { return _this.model.factory(data); });
    };
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
    BaseLoopBackApi.prototype.onDeleteById = function (id) {
        var _this = this;
        return this.request('DELETE', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id: id }, undefined, undefined, true).map(function (data) { return _this.model.factory(data); });
    };
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
    BaseLoopBackApi.prototype.count = function (where, customHeaders) {
        if (where === void 0) { where = {}; }
        var _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('GET', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'count'
        ].join('/'), undefined, _urlParams, undefined, null, customHeaders);
    };
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
    BaseLoopBackApi.prototype.updateAttributes = function (id, data, customHeaders) {
        var _this = this;
        return this.request('PUT', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id: id }, undefined, { data: data }, null, customHeaders)
            .map(function (data) { return _this.model.factory(data); });
    };
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
    BaseLoopBackApi.prototype.onUpdateAttributes = function (id, data) {
        var _this = this;
        return this.request('PUT', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id: id }, undefined, { data: data }, true).map(function (data) { return _this.model.factory(data); });
    };
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
    BaseLoopBackApi.prototype.upsert = function (data, customHeaders) {
        var _this = this;
        if (data === void 0) { data = {}; }
        return this.request('PUT', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
        ].join('/'), undefined, undefined, { data: data }, null, customHeaders)
            .map(function (data) { return _this.model.factory(data); });
    };
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
    BaseLoopBackApi.prototype.onUpsert = function (data) {
        var _this = this;
        if (data === void 0) { data = {}; }
        return this.request('PUT', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
        ].join('/'), undefined, undefined, { data: data }, true).map(function (data) { return _this.model.factory(data); });
    };
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
    BaseLoopBackApi.prototype.upsertPatch = function (data, customHeaders) {
        var _this = this;
        if (data === void 0) { data = {}; }
        return this.request('PATCH', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
        ].join('/'), undefined, undefined, { data: data }, null, customHeaders)
            .map(function (data) { return _this.model.factory(data); });
    };
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
    BaseLoopBackApi.prototype.onUpsertPatch = function (data) {
        var _this = this;
        if (data === void 0) { data = {}; }
        return this.request('PATCH', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
        ].join('/'), undefined, undefined, { data: data }, true).map(function (data) { return _this.model.factory(data); });
    };
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
    BaseLoopBackApi.prototype.upsertWithWhere = function (where, data, customHeaders) {
        var _this = this;
        if (where === void 0) { where = {}; }
        if (data === void 0) { data = {}; }
        var _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'upsertWithWhere'
        ].join('/'), undefined, _urlParams, { data: data }, null, customHeaders)
            .map(function (data) { return _this.model.factory(data); });
    };
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
    BaseLoopBackApi.prototype.onUpsertWithWhere = function (where, data) {
        var _this = this;
        if (where === void 0) { where = {}; }
        if (data === void 0) { data = {}; }
        var _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'upsertWithWhere'
        ].join('/'), undefined, _urlParams, { data: data }, true).map(function (data) { return _this.model.factory(data); });
    };
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
    BaseLoopBackApi.prototype.replaceOrCreate = function (data, customHeaders) {
        var _this = this;
        if (data === void 0) { data = {}; }
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'replaceOrCreate'
        ].join('/'), undefined, undefined, { data: data }, null, customHeaders)
            .map(function (data) { return _this.model.factory(data); });
    };
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
    BaseLoopBackApi.prototype.onReplaceOrCreate = function (data) {
        var _this = this;
        if (data === void 0) { data = {}; }
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'replaceOrCreate'
        ].join('/'), undefined, undefined, { data: data }, true).map(function (data) { return _this.model.factory(data); });
    };
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
    BaseLoopBackApi.prototype.replaceById = function (id, data, customHeaders) {
        var _this = this;
        if (data === void 0) { data = {}; }
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id', 'replace'
        ].join('/'), { id: id }, undefined, { data: data }, null, customHeaders)
            .map(function (data) { return _this.model.factory(data); });
    };
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
    BaseLoopBackApi.prototype.onReplaceById = function (id, data) {
        var _this = this;
        if (data === void 0) { data = {}; }
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id', 'replace'
        ].join('/'), { id: id }, undefined, { data: data }, true).map(function (data) { return _this.model.factory(data); });
    };
    /**
     * \@method createChangeStream
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * \@description
     * Generic createChangeStream method
     * @return {?}
     */
    BaseLoopBackApi.prototype.createChangeStream = function () {
        var subject = new Subject.Subject();
        if (typeof EventSource !== 'undefined') {
            var emit = function (msg) { return subject.next(JSON.parse(msg.data)); };
            var source = new EventSource([
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
    };
    return BaseLoopBackApi;
}());
BaseLoopBackApi.decorators = [
    { type: core.Injectable },
];
BaseLoopBackApi.ctorParameters = function () { return [
    { type: http.Http, decorators: [{ type: core.Inject, args: [http.Http,] },] },
    { type: SocketConnection, decorators: [{ type: core.Inject, args: [SocketConnection,] },] },
    { type: SDKModels, decorators: [{ type: core.Inject, args: [SDKModels,] },] },
    { type: LoopBackAuth, decorators: [{ type: core.Inject, args: [LoopBackAuth,] },] },
    { type: JSONSearchParams, decorators: [{ type: core.Inject, args: [JSONSearchParams,] },] },
    { type: ErrorHandler, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ErrorHandler,] },] },
]; };
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
var AdminApi = /** @class */ (function (_super) {
    __extends(AdminApi, _super);
    function AdminApi(http$$1, connection, models, auth, searchParams, errorHandler) {
        var _this = _super.call(this, http$$1, connection, models, auth, searchParams, errorHandler) || this;
        _this.http = http$$1;
        _this.connection = connection;
        _this.models = models;
        _this.auth = auth;
        _this.searchParams = searchParams;
        _this.errorHandler = errorHandler;
        return _this;
    }
    AdminApi.prototype.findByIdAccessTokens = function (id, fk, customHeaders) {
        var _method = "GET";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/Admins/:id/accessTokens/:fk";
        var _routeParams = {
            id: id,
            fk: fk
        };
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    AdminApi.prototype.destroyByIdAccessTokens = function (id, fk, customHeaders) {
        var _method = "DELETE";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/Admins/:id/accessTokens/:fk";
        var _routeParams = {
            id: id,
            fk: fk
        };
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    AdminApi.prototype.updateByIdAccessTokens = function (id, fk, data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PUT";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/Admins/:id/accessTokens/:fk";
        var _routeParams = {
            id: id,
            fk: fk
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    AdminApi.prototype.getAccessTokens = function (id, filter, customHeaders) {
        if (filter === void 0) { filter = {}; }
        var _method = "GET";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/Admins/:id/accessTokens";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        if (typeof filter !== 'undefined' && filter !== null)
            _urlParams.filter = filter;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    AdminApi.prototype.createAccessTokens = function (id, data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "POST";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/Admins/:id/accessTokens";
        var _routeParams = {
            id: id
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    AdminApi.prototype.deleteAccessTokens = function (id, customHeaders) {
        var _method = "DELETE";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/Admins/:id/accessTokens";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    AdminApi.prototype.countAccessTokens = function (id, where, customHeaders) {
        if (where === void 0) { where = {}; }
        var _method = "GET";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/Admins/:id/accessTokens/count";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        if (typeof where !== 'undefined' && where !== null)
            _urlParams.where = where;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    AdminApi.prototype.patchOrCreate = function (data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PATCH";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/Admins";
        var _routeParams = {};
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    AdminApi.prototype.patchAttributes = function (id, data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PATCH";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/Admins/:id";
        var _routeParams = {
            id: id
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    AdminApi.prototype.login = function (credentials, include, rememberMe, customHeaders) {
        var _this = this;
        if (include === void 0) { include = 'user'; }
        if (rememberMe === void 0) { rememberMe = true; }
        var _method = "POST";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/Admins/login";
        var _routeParams = {};
        var _postBody = {
            credentials: credentials
        };
        var _urlParams = {};
        if (typeof include !== 'undefined' && include !== null)
            _urlParams.include = include;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders)
            .map(function (response) {
            response.ttl = parseInt(response.ttl);
            response.rememberMe = rememberMe;
            _this.auth.setToken(response);
            return response;
        });
        return result;
    };
    AdminApi.prototype.logout = function (customHeaders) {
        var _method = "POST";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/Admins/logout";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        _urlParams.access_token = this.auth.getAccessTokenId();
        this.auth.clear();
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    AdminApi.prototype.verify = function (id, customHeaders) {
        var _method = "POST";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/Admins/:id/verify";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    AdminApi.prototype.confirm = function (uid, token, redirect, customHeaders) {
        if (redirect === void 0) { redirect = {}; }
        var _method = "GET";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/Admins/confirm";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        if (typeof uid !== 'undefined' && uid !== null)
            _urlParams.uid = uid;
        if (typeof token !== 'undefined' && token !== null)
            _urlParams.token = token;
        if (typeof redirect !== 'undefined' && redirect !== null)
            _urlParams.redirect = redirect;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    AdminApi.prototype.resetPassword = function (options, customHeaders) {
        var _method = "POST";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/Admins/reset";
        var _routeParams = {};
        var _postBody = {
            options: options
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    AdminApi.prototype.changePassword = function (oldPassword, newPassword, customHeaders) {
        var _method = "POST";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/Admins/change-password";
        var _routeParams = {};
        var _postBody = {
            data: {
                oldPassword: oldPassword,
                newPassword: newPassword
            }
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    AdminApi.prototype.setPassword = function (newPassword, customHeaders) {
        var _method = "POST";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/Admins/reset-password";
        var _routeParams = {};
        var _postBody = {
            data: {
                newPassword: newPassword
            }
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    AdminApi.prototype.createManyAccessTokens = function (id, data, customHeaders) {
        if (data === void 0) { data = []; }
        var _method = "POST";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/Admins/:id/accessTokens";
        var _routeParams = {
            id: id
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    AdminApi.prototype.getCurrent = function (filter) {
        if (filter === void 0) { filter = {}; }
        var _method = "GET";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() + "/Admins" + "/:id";
        var id = this.auth.getCurrentUserId();
        if (id == null)
            id = '__anonymous__';
        var _routeParams = { id: id };
        var _urlParams = {};
        var _postBody = {};
        if (filter)
            _urlParams.filter = filter;
        return this.request(_method, _url, _routeParams, _urlParams, _postBody);
    };
    AdminApi.prototype.getCachedCurrent = function () {
        return this.auth.getCurrentUserData();
    };
    AdminApi.prototype.getCurrentToken = function () {
        return this.auth.getToken();
    };
    AdminApi.prototype.isAuthenticated = function () {
        return !(this.getCurrentId() === '' || this.getCurrentId() == null || this.getCurrentId() == 'null');
    };
    AdminApi.prototype.getCurrentId = function () {
        return this.auth.getCurrentUserId();
    };
    AdminApi.prototype.getModelName = function () {
        return "Admin";
    };
    return AdminApi;
}(BaseLoopBackApi));
AdminApi.decorators = [
    { type: core.Injectable },
];
AdminApi.ctorParameters = function () { return [
    { type: http.Http, decorators: [{ type: core.Inject, args: [http.Http,] },] },
    { type: SocketConnection, decorators: [{ type: core.Inject, args: [SocketConnection,] },] },
    { type: SDKModels, decorators: [{ type: core.Inject, args: [SDKModels,] },] },
    { type: LoopBackAuth, decorators: [{ type: core.Inject, args: [LoopBackAuth,] },] },
    { type: JSONSearchParams, decorators: [{ type: core.Inject, args: [JSONSearchParams,] },] },
    { type: ErrorHandler, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ErrorHandler,] },] },
]; };
/**
 * @author Jonathan Casarrubias <twitter:\@johncasarrubias> <github:\@johncasarrubias>
 * \@module LoggerService
 * @license MIT
 * \@description
 * Console Log wrapper that can be disabled in production mode
 *
 */
var ApiLoguedGuard = /** @class */ (function () {
    function ApiLoguedGuard(auth, userApi) {
        this.auth = auth;
        this.userApi = userApi;
    }
    ApiLoguedGuard.prototype.canActivate = function (next, state) {
        if (!ApiLoguedGuard.valid) {
            var user = this.auth.getCurrentUserData();
            var token = this.auth.getToken();
            return this.userApi.getCurrent().toPromise().then(function (user) {
                ApiLoguedGuard.valid = true;
                return true;
            }, function (err) {
                return false;
            });
        }
        else {
            return true;
        }
    };
    return ApiLoguedGuard;
}());
ApiLoguedGuard.valid = false;
ApiLoguedGuard.decorators = [
    { type: core.Injectable },
];
ApiLoguedGuard.ctorParameters = function () { return [
    { type: LoopBackAuth, },
    { type: AdminApi, },
]; };
var declarations = [
    ModelFormComponent,
    ApiRowComponent,
    ApiTableComponent,
    PaginatorComponent, CapitalizePipe, ModelSearchComponent
];
var LoopbackNgAdminModule = /** @class */ (function () {
    function LoopbackNgAdminModule() {
    }
    return LoopbackNgAdminModule;
}());
LoopbackNgAdminModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
                    forms.FormsModule,
                    router.RouterModule,
                    angularFroalaWysiwyg.FroalaEditorModule.forRoot(), angularFroalaWysiwyg.FroalaViewModule.forRoot()
                ],
                declarations: __spread(declarations),
                providers: [ApiLoguedGuard],
                exports: __spread(declarations)
            },] },
];
LoopbackNgAdminModule.ctorParameters = function () { return []; };
var LoopbackApiLoaderComponent = /** @class */ (function () {
    function LoopbackApiLoaderComponent(loaderApi) {
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
    LoopbackApiLoaderComponent.prototype.loadModels = function () {
        if (!LoopbackApiLoaderComponent.sdkModels) {
            LoopbackApiLoaderComponent.sdkModels = new SDKModels();
        }
    };
    LoopbackApiLoaderComponent.prototype.loadRoutes = function () {
        this.apiRoute = this.modelDefinition.path.toLowerCase();
        this.editRoute = this.baseRoute + "/" + this.apiRoute;
        this.createRoute = this.editRoute + "/create";
    };
    LoopbackApiLoaderComponent.prototype.loadModel = function () {
        this.loaderItemModel = LoopbackApiLoaderComponent.sdkModels.get(this.loaderApi.getModelName());
        this.modelDefinition = this.loaderItemModel.getModelDefinition();
        this.modelProperties = this.modelDefinition.properties;
    };
    LoopbackApiLoaderComponent.prototype.getFilter = function () {
        var filter = { limit: this.loaderConfig.limit, skip: this.loaderConfig.limit * this.loaderPage };
        if (this.loaderSearch) {
            var search = this.loaderSearch;
            var name = search.property;
            if (search.property !== 'any') {
                filter['where'] = {};
                filter['where'][name] = { 'like': search.value, options: 'i' };
            }
            else {
                filter['where'] = this.getWhereAny(search.properties, search.value);
            }
        }
        return filter;
    };
    LoopbackApiLoaderComponent.prototype.getWhereAny = function (properties, value) {
        var where = { or: [] };
        for (var i in properties) {
            var name = properties[i];
            var type = this.modelProperties[name].type;
            if (type != 'Date') {
                var item = {};
                item[name] = { 'like': value, options: 'i' };
                where.or.push(item);
            }
        }
        return where;
    };
    LoopbackApiLoaderComponent.prototype.loadData = function () {
        var _this = this;
        this.loaderApi.find(this.getFilter()).toPromise().then(function (items) {
            _this.loaderItems = items;
        });
        this.loaderApi.count().toPromise().then(function (count) { return _this.loaderCount = count.count; }).catch(this.handleError);
    };
    LoopbackApiLoaderComponent.prototype.apiSearch = function ($event) {
        this.loaderSearch = $event;
        this.loadData();
    };
    LoopbackApiLoaderComponent.prototype.handleError = function (error) {
        alert(error.message ? error.message : error);
    };
    LoopbackApiLoaderComponent.prototype.nextPage = function () {
        this.loaderPage++;
        this.loadData();
    };
    LoopbackApiLoaderComponent.prototype.prevPage = function () {
        this.loaderPage--;
        this.loadData();
    };
    return LoopbackApiLoaderComponent;
}());
LoopbackApiLoaderComponent.sdkModels = null;
var LoopbackApiItemEditorComponent = /** @class */ (function () {
    function LoopbackApiItemEditorComponent(api, route) {
        this.api = api;
        this.route = route;
        this.baseRoute = '/dashboard';
        var model = this.api.getModel();
        this.item = new model();
        this.className = this.item.constructor.name;
        var constr = this.item.constructor;
        this.backRoute = this.baseRoute + "/" + constr.getModelDefinition().path.toLowerCase();
    }
    LoopbackApiItemEditorComponent.prototype.loadParams = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            if (params["id"]) {
                _this.selectedId = params["id"];
                _this.loadData();
            }
        });
    };
    LoopbackApiItemEditorComponent.prototype.loadData = function () {
        var _this = this;
        return this.api.findById(this.selectedId).toPromise().then(function (item) { return _this.item = item; }).catch(this.handleError);
    };
    LoopbackApiItemEditorComponent.prototype.handleError = function (error) {
        alert(error.message);
    };
    LoopbackApiItemEditorComponent.prototype.createItem = function () {
        return this.api.create(this.item).toPromise().catch(this.handleError);
    };
    LoopbackApiItemEditorComponent.prototype.editItem = function () {
        return this.api.upsert(this.item).toPromise().catch(this.handleError);
    };
    LoopbackApiItemEditorComponent.prototype.onSubmit = function ($event) {
        var _this = this;
        this.item = $event;
        var promise = this.api.create(this.item).toPromise();
        if (this.item['id']) {
            promise = this.api.upsert(this.item).toPromise();
        }
        promise.then(function (item) {
            _this.item = item;
            alert('Element modified');
        }).catch(this.handleError);
    };
    LoopbackApiItemEditorComponent.prototype.removeItem = function () {
        var resp = confirm("Are you sure you want to remove?");
        if (!resp)
            return;
        this.api.deleteById(this.item['id']).toPromise().then(function (item) { alert('item removed'); window.history.back(); }, this.handleError);
    };
    return LoopbackApiItemEditorComponent;
}());

exports.LoopbackNgAdminModule = LoopbackNgAdminModule;
exports.ApiTableComponent = ApiTableComponent;
exports.ApiRowComponent = ApiRowComponent;
exports.ModelFormComponent = ModelFormComponent;
exports.ModelSearchComponent = ModelSearchComponent;
exports.PaginatorComponent = PaginatorComponent;
exports.LoopbackApiLoaderComponent = LoopbackApiLoaderComponent;
exports.LoopbackApiItemEditorComponent = LoopbackApiItemEditorComponent;
exports.ApiLoguedGuard = ApiLoguedGuard;
exports.CapitalizePipe = CapitalizePipe;
exports.ɵb = ApiRowComponent;
exports.ɵc = ApiTableComponent;
exports.ɵa = ModelFormComponent;
exports.ɵf = ModelSearchComponent;
exports.ɵd = PaginatorComponent;
exports.ɵg = ApiLoguedGuard;
exports.ɵe = CapitalizePipe;
exports.ɵi = AdminApi;
exports.ɵh = LoopBackAuth;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=loopback-ng-admin.umd.js.map

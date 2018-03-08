import { Http, Headers } from '@angular/http';
import { JSONSearchParams } from './search.params';
import { ErrorHandler } from './error.service';
import { LoopBackAuth } from './auth.service';
import { LoopBackFilter } from '../../models/BaseModels';
import { SDKModels } from '../custom/SDKModels';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { SocketConnection } from '../../sockets/socket.connections';
/**
* @module BaseLoopBackApi
* @author Jonathan Casarrubias <@johncasarrubias> <github:jonathan-casarrubias>
* @author Nikolay Matiushenkov <https://github.com/mnvx>
* @license MIT
* @description
* Abstract class that will be implemented in every custom service automatically built
* by the sdk builder.
* It provides the core functionallity for every API call, either by HTTP Calls or by
* WebSockets.
**/
export declare abstract class BaseLoopBackApi {
    protected http: Http;
    protected connection: SocketConnection;
    protected models: SDKModels;
    protected auth: LoopBackAuth;
    protected searchParams: JSONSearchParams;
    protected errorHandler: ErrorHandler;
    protected path: string;
    protected model: any;
    constructor(http: Http, connection: SocketConnection, models: SDKModels, auth: LoopBackAuth, searchParams: JSONSearchParams, errorHandler: ErrorHandler);
    getModel(): any;
    /**
     * @method request
     * @param  method      Request method (GET, POST, PUT)
     * @param  url         Request url (my-host/my-url/:id)
     * @param     routeParams Values of url parameters
     * @param     urlParams   Parameters for building url (filter and other)
     * @param     postBody    Request postBody
     * @return
     * @description
     * This is a core method, every HTTP Call will be done from here, every API Service will
     * extend this class and use this method to get RESTful communication.
     **/
    request(method: string, url: string, routeParams?: any, urlParams?: any, postBody?: any, pubsub?: boolean, customHeaders?: Function): Observable<any>;
    /**
     * @method authenticate
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param url Server URL
     * @param headers HTTP Headers
     * @return
     * @description
     * This method will try to authenticate using either an access_token or basic http auth
     */
    authenticate<T>(url: string, headers: Headers): void;
    /**
     * @method create
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param data Generic data type
     * @return
     * @description
     * Generic create method
     */
    create<T>(data: T, customHeaders?: Function): Observable<T>;
    /**
     * @method onCreate
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param data Generic data type array
     * @return
     * @description
     * Generic pubsub oncreate many method
     */
    onCreate<T>(data: T[]): Observable<T[]>;
    /**
     * @method createMany
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param data Generic data type array
     * @return
     * @description
     * Generic create many method
     */
    createMany<T>(data: T[], customHeaders?: Function): Observable<T[]>;
    /**
     * @method onCreateMany
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param data Generic data type array
     * @return
     * @description
     * Generic create many method
     */
    onCreateMany<T>(data: T[]): Observable<T[]>;
    /**
     * @method findById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param data Generic data type
     * @return
     * @description
     * Generic findById method
     */
    findById<T>(id: any, filter?: LoopBackFilter, customHeaders?: Function): Observable<T>;
    /**
     * @method find
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return
     * @description
     * Generic find method
     */
    find<T>(filter?: LoopBackFilter, customHeaders?: Function): Observable<T[]>;
    /**
     * @method exists
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return
     * @description
     * Generic exists method
     */
    exists<T>(id: any, customHeaders?: Function): Observable<T>;
    /**
     * @method findOne
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return
     * @description
     * Generic findOne method
     */
    findOne<T>(filter?: LoopBackFilter, customHeaders?: Function): Observable<T>;
    /**
     * @method updateAll
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return
     * @description
     * Generic updateAll method
     */
    updateAll<T>(where: any, data: T, customHeaders?: Function): Observable<{
        count: 'number';
    }>;
    /**
     * @method onUpdateAll
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return
     * @description
     * Generic pubsub onUpdateAll method
     */
    onUpdateAll<T>(where: any, data: T): Observable<{
        count: 'number';
    }>;
    /**
     * @method deleteById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return
     * @description
     * Generic deleteById method
     */
    deleteById<T>(id: any, customHeaders?: Function): Observable<T>;
    /**
     * @method onDeleteById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return
     * @description
     * Generic pubsub onDeleteById method
     */
    onDeleteById<T>(id: any): Observable<T>;
    /**
     * @method count
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return
     * @description
     * Generic count method
     */
    count(where?: any, customHeaders?: Function): Observable<{
        count: number;
    }>;
    /**
     * @method updateAttributes
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return
     * @description
     * Generic updateAttributes method
     */
    updateAttributes<T>(id: any, data: T, customHeaders?: Function): Observable<T>;
    /**
     * @method onUpdateAttributes
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return
     * @description
     * Generic onUpdateAttributes method
     */
    onUpdateAttributes<T>(id: any, data: T): Observable<T>;
    /**
     * @method upsert
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return
     * @description
     * Generic upsert method
     */
    upsert<T>(data?: any, customHeaders?: Function): Observable<T>;
    /**
     * @method onUpsert
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return
     * @description
     * Generic pubsub onUpsert method
     */
    onUpsert<T>(data?: any): Observable<T>;
    /**
     * @method upsertPatch
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return
     * @description
     * Generic upsert method using patch http method
     */
    upsertPatch<T>(data?: any, customHeaders?: Function): Observable<T>;
    /**
     * @method onUpsertPatch
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return
     * @description
     * Generic pubsub onUpsertPatch method using patch http method
     */
    onUpsertPatch<T>(data?: any): Observable<T>;
    /**
     * @method upsertWithWhere
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return
     * @description
     * Generic upsertWithWhere method
     */
    upsertWithWhere<T>(where?: any, data?: any, customHeaders?: Function): Observable<T>;
    /**
     * @method onUpsertWithWhere
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return
     * @description
     * Generic pubsub onUpsertWithWhere method
     */
    onUpsertWithWhere<T>(where?: any, data?: any): Observable<T>;
    /**
     * @method replaceOrCreate
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return
     * @description
     * Generic replaceOrCreate method
     */
    replaceOrCreate<T>(data?: any, customHeaders?: Function): Observable<T>;
    /**
     * @method onReplaceOrCreate
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return
     * @description
     * Generic onReplaceOrCreate method
     */
    onReplaceOrCreate<T>(data?: any): Observable<T>;
    /**
     * @method replaceById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return
     * @description
     * Generic replaceById method
     */
    replaceById<T>(id: any, data?: any, customHeaders?: Function): Observable<T>;
    /**
     * @method onReplaceById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return
     * @description
     * Generic onReplaceById method
     */
    onReplaceById<T>(id: any, data?: any): Observable<T>;
    /**
     * @method createChangeStream
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return
     * @description
     * Generic createChangeStream method
     */
    createChangeStream(): Observable<any>;
    /**
     * @method getModelName
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return
     * @description
     * Abstract getModelName method
     */
    abstract getModelName(): string;
}

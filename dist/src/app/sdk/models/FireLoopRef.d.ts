import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/merge';
import { LoopBackFilter, StatFilter } from './index';
import { SocketConnection } from '../sockets/socket.connections';
/**
 * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
 * @license MIT
 * @description
 * This class allows to create FireLoop References which will be in sync with
 * Server. It also allows to create FireLoop Reference Childs, that allows to
 * persist data according the generic model relationships.
 **/
export declare class FireLoopRef<T> {
    private model;
    private socket;
    private parent;
    private relationship;
    private id;
    private instance;
    private childs;
    private disposable;
    /**
    * @method constructor
    * @param model The model we want to create a reference
    * @param socket Socket connection to handle events
    * @param parent Parent FireLoop model reference
    * @param relationship The defined model relationship
    * @description
    * The constructor will receive the required parameters and then will register this reference
    * into the server, needed to allow multiple references for the same model.
    * This ids are referenced into this specific client connection and won't have issues
    * with other client ids.
    **/
    constructor(model: any, socket: SocketConnection, parent?: FireLoopRef<any>, relationship?: string);
    /**
    * @method dispose
    * @return
    * @description
    * This method is super important to avoid memory leaks in the server.
    * This method requires to be called on components destroy
    *
    * ngOnDestroy() {
    *  this.someRef.dispose()
    * }
    **/
    dispose(): void;
    /**
    * @method upsert
    * @param data Persisted model instance
    * @return
    * @description
    * Operation wrapper for upsert function.
    **/
    upsert(data: T): Observable<T>;
    /**
    * @method create
    * @param data Persisted model instance
    * @return
    * @description
    * Operation wrapper for create function.
    **/
    create(data: T): Observable<T>;
    /**
    * @method remove
    * @param data Persisted model instance
    * @return
    * @description
    * Operation wrapper for remove function.
    **/
    remove(data: T): Observable<T>;
    /**
    * @method remote
    * @param method Remote method name
    * @param params Parameters to be applied into the remote method
    * @param broadcast Flag to define if the method results should be broadcasted
    * @return
    * @description
    * This method calls for any remote method. It is flexible enough to
    * allow you call either built-in or custom remote methods.
    *
    * FireLoop provides this interface to enable calling remote methods
    * but also to optionally send any defined accept params that will be
    * applied within the server.
    **/
    remote(method: string, params?: any[], broadcast?: boolean): Observable<any>;
    /**
    * @method onRemote
    * @param method Remote method name
    * @return
    * @description
    * This method listen for public broadcasted remote method results. If the remote method
    * execution is not public only the owner will receive the result data.
    **/
    onRemote(method: string): Observable<any>;
    /**
    * @method on
    * @param event Event name
    * @param filter LoopBack query filter
    * @return
    * @description
    * Listener for different type of events. Valid events are:
    *   - change (Triggers on any model change -create, update, remove-)
    *   - value (Triggers on new entries)
    *   - child_added (Triggers when a child is added)
    *   - child_updated (Triggers when a child is updated)
    *   - child_removed (Triggers when a child is removed)
    **/
    on(event: string, filter?: LoopBackFilter): Observable<T | T[]>;
    /**
    * @method stats
    * @param filter LoopBack query filter
    * @return
    * @description
    * Listener for real-time statistics, will trigger on every
    * statistic modification.
    * TIP: You can improve performance by adding memcached to LoopBack models.
    **/
    stats(filter?: StatFilter): Observable<T | T[]>;
    /**
    * @method make
    * @param instance Persisted model instance reference
    * @return
    * @description
    * This method will set a model instance into this a new FireLoop Reference.
    * This allows to persiste parentship when creating related instances.
    *
    * It also allows to have multiple different persisted instance references to same model.
    * otherwise if using singleton will replace a previous instance for a new instance, when
    * we actually want to have more than 1 instance of same model.
    **/
    make(instance: any): FireLoopRef<T>;
    /**
    * @method child
    * @param relationship A defined model relationship
    * @return
    * @description
    * This method creates child references, which will persist related model
    * instances. e.g. Room.messages, where messages belongs to a specific Room.
    **/
    child<T>(relationship: string): FireLoopRef<T>;
    /**
    * @method pull
    * @param event Event name
    * @param request Type of request, can be LB-only filter or FL+LB filter
    * @return
    * @description
    * This method will pull initial data from server
    **/
    private pull(event, request);
    /**
    * @method broadcasts
    * @param event Event name
    * @param request Type of request, can be LB-only filter or FL+LB filter
    * @return
    * @description
    * This will listen for public broadcasts announces and then request
    * for data according a specific client request, not shared with other clients.
    **/
    private broadcasts(event, request);
    /**
    * @method operation
    * @param event Event name
    * @param data Any type of data sent to the server
    * @return
    * @description
    * This internal method will run operations depending on current context
    **/
    private operation(event, data);
    /**
    * @method buildId
    * @return
    * @description
    * This internal method build an ID for this reference, this allows to have
    * multiple references for the same model or relationships.
    **/
    private buildId();
}

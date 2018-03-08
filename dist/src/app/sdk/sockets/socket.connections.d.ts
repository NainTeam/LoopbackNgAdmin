import { NgZone } from '@angular/core';
import { SocketDriver } from './socket.driver';
import { AccessToken } from '../models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
* @module SocketConnection
* @license MIT
* @description
* This module handle socket connections and return singleton instances for each
* connection, it will use the SDK Socket Driver Available currently supporting
* Angular 2 for web, NativeScript 2 and Angular Universal.
**/
export declare class SocketConnection {
    private driver;
    private zone;
    private socket;
    private subjects;
    sharedObservables: {
        sharedOnConnect?: Observable<any>;
        sharedOnDisconnect?: Observable<any>;
        sharedOnAuthenticated?: Observable<any>;
        sharedOnUnAuthorized?: Observable<any>;
    };
    authenticated: boolean;
    /**
     * @method constructor
     * @param driver Socket IO Driver
     * @param zone Angular 2 Zone
     * @description
     * The constructor will set references for the shared hot observables from
     * the class subjects. Then it will subscribe each of these observables
     * that will create a channel that later will be shared between subscribers.
     **/
    constructor(driver: SocketDriver, zone: NgZone);
    /**
     * @method connect
     * @param token AccesToken instance
     * @return
     * @description
     * This method will create a new socket connection when not previously established.
     * If there is a broken connection it will re-connect.
     **/
    connect(token?: AccessToken): void;
    /**
     * @method isConnected
     * @return
     * @description
     * This method will return true or false depending on established connections
     **/
    isConnected(): boolean;
    /**
     * @method on
     * @param event Event name
     * @param handler Event listener handler
     * @return
     * @description
     * This method listen for server events from the current WebSocket connection.
     * This method is a facade that will wrap the original "on" method and run it
     * within the Angular Zone to avoid update issues.
     **/
    on(event: string, handler: Function): void;
    /**
     * @method emit
     * @param event Event name
     * @param data Any type of data
     * @return
     * @description
     * This method will send any type of data to the server according the event set.
     **/
    emit(event: string, data?: any): void;
    /**
     * @method removeListener
     * @param event Event name
     * @param handler Event listener handler
     * @return
     * @description
     * This method will wrap the original "on" method and run it within the Angular Zone
     * Note: off is being used since the nativescript socket io client does not provide
     * removeListener method, but only provides with off which is provided in any platform.
     **/
    removeListener(event: string, handler: Function): void;
    /**
     * @method removeAllListeners
     * @param event Event name
     * @param handler Event listener handler
     * @return
     * @description
     * This method will wrap the original "on" method and run it within the Angular Zone
     * Note: off is being used since the nativescript socket io client does not provide
     * removeListener method, but only provides with off which is provided in any platform.
     **/
    removeAllListeners(event: string): void;
    /**
     * @method disconnect
     * @return
     * @description
     * This will disconnect the client from the server
     **/
    disconnect(): void;
    /**
     * @method heartbeater
     * @return
     * @description
     * This will keep the connection as active, even when users are not sending
     * data, this avoids disconnection because of a connection not being used.
     **/
    private heartbeater();
}

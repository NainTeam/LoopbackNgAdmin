import { InternalStorage } from '../../storage/storage.swaps';
import { SDKToken } from '../../models/BaseModels';
/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
* @module SocketConnection
* @license MIT
* @description
* This module handle socket connections and return singleton instances for each
* connection, it will use the SDK Socket Driver Available currently supporting
* Angular 2 for web, NativeScript 2 and Angular Universal.
**/
export declare class LoopBackAuth {
    protected storage: InternalStorage;
    /**
     *
     **/
    private token;
    /**
     *
     **/
    protected prefix: string;
    /**
     * @method constructor
     * @param storage Internal Storage Driver
     * @description
     * The constructor will initialize the token loading data from storage
     **/
    constructor(storage: InternalStorage);
    /**
     * @method setRememberMe
     * @param value Flag to remember credentials
     * @return
     * @description
     * This method will set a flag in order to remember the current credentials
     **/
    setRememberMe(value: boolean): void;
    /**
     * @method setUser
     * @param user Any type of user model
     * @return
     * @description
     * This method will update the user information and persist it if the
     * rememberMe flag is set.
     **/
    setUser(user: any): void;
    /**
     * @method setToken
     * @param token SDKToken or casted AccessToken instance
     * @return
     * @description
     * This method will set a flag in order to remember the current credentials
     **/
    setToken(token: SDKToken): void;
    /**
     * @method getToken
     * @return
     * @description
     * This method will set a flag in order to remember the current credentials.
     **/
    getToken(): SDKToken;
    /**
     * @method getAccessTokenId
     * @return
     * @description
     * This method will return the actual token string, not the object instance.
     **/
    getAccessTokenId(): string;
    /**
     * @method getCurrentUserId
     * @return
     * @description
     * This method will return the current user id, it can be number or string.
     **/
    getCurrentUserId(): any;
    /**
     * @method getCurrentUserData
     * @return
     * @description
     * This method will return the current user instance.
     **/
    getCurrentUserData(): any;
    /**
     * @method save
     * @return Whether or not the information was saved
     * @description
     * This method will save in either local storage or cookies the current credentials.
     * But only if rememberMe is enabled.
     **/
    save(): boolean;
    /**
     * @method load
     * @param prop Property name
     * @return Any information persisted in storage
     * @description
     * This method will load either from local storage or cookies the provided property.
     **/
    protected load(prop: string): any;
    /**
     * @method clear
     * @return
     * @description
     * This method will clear cookies or the local storage.
     **/
    clear(): void;
    /**
     * @method persist
     * @return
     * @description
     * This method saves values to storage
     **/
    protected persist(prop: string, value: any, expires?: Date): void;
}

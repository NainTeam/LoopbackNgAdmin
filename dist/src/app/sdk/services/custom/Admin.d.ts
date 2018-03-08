import { Http } from '@angular/http';
import { SDKModels } from './SDKModels';
import { BaseLoopBackApi } from '../core/base.service';
import { LoopBackAuth } from '../core/auth.service';
import { LoopBackFilter, AccessToken } from '../../models/BaseModels';
import { JSONSearchParams } from '../core/search.params';
import { ErrorHandler } from '../core/error.service';
import { Observable } from 'rxjs/Rx';
import { SocketConnection } from '../../sockets/socket.connections';
/**
 * Api services for the `Admin` model.
 */
export declare class AdminApi extends BaseLoopBackApi {
    protected http: Http;
    protected connection: SocketConnection;
    protected models: SDKModels;
    protected auth: LoopBackAuth;
    protected searchParams: JSONSearchParams;
    protected errorHandler: ErrorHandler;
    constructor(http: Http, connection: SocketConnection, models: SDKModels, auth: LoopBackAuth, searchParams: JSONSearchParams, errorHandler: ErrorHandler);
    /**
     * Find a related item by id for accessTokens.
     *
     *  id Admin id
     *
     *  fk Foreign key for accessTokens
     *
     * @returns An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Admin` object.)
     * </em>
     */
    findByIdAccessTokens(id: any, fk: any, customHeaders?: Function): Observable<any>;
    /**
     * Delete a related item by id for accessTokens.
     *
     *  id Admin id
     *
     *  fk Foreign key for accessTokens
     *
     * @returns An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    destroyByIdAccessTokens(id: any, fk: any, customHeaders?: Function): Observable<any>;
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
     * @returns An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Admin` object.)
     * </em>
     */
    updateByIdAccessTokens(id: any, fk: any, data?: any, customHeaders?: Function): Observable<any>;
    /**
     * Queries accessTokens of Admin.
     *
     *  id Admin id
     *
     *  filter
     *
     * @returns An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Admin` object.)
     * </em>
     */
    getAccessTokens(id: any, filter?: LoopBackFilter, customHeaders?: Function): Observable<any>;
    /**
     * Creates a new instance in accessTokens of this model.
     *
     *  id Admin id
     *
     *  data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Admin` object.)
     * </em>
     */
    createAccessTokens(id: any, data?: any, customHeaders?: Function): Observable<any>;
    /**
     * Deletes all accessTokens of this model.
     *
     *  id Admin id
     *
     * @returns An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    deleteAccessTokens(id: any, customHeaders?: Function): Observable<any>;
    /**
     * Counts accessTokens of Admin.
     *
     *  id Admin id
     *
     *  where Criteria to match model instances
     *
     * @returns An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * Data properties:
     *
     *  - `count` – `{number}` -
     */
    countAccessTokens(id: any, where?: any, customHeaders?: Function): Observable<any>;
    /**
     * Patch an existing model instance or insert a new one into the data source.
     *
     *  data Request data.
     *
     *  - `data` – `{object}` - Model instance data
     *
     * @returns An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Admin` object.)
     * </em>
     */
    patchOrCreate(data?: any, customHeaders?: Function): Observable<any>;
    /**
     * Patch attributes for a model instance and persist it into the data source.
     *
     *  id Admin id
     *
     *  data Request data.
     *
     *  - `data` – `{object}` - An object of model property name/value pairs
     *
     * @returns An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Admin` object.)
     * </em>
     */
    patchAttributes(id: any, data?: any, customHeaders?: Function): Observable<any>;
    /**
     * Login a user with username/email and password.
     *
     * @param include Related objects to include in the response. See the description of return value for more details.
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
     * @returns An empty reference that will be
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
    login(credentials: any, include?: any, rememberMe?: boolean, customHeaders?: Function): Observable<any>;
    /**
     * Logout a user with access token.
     *
     *  data Request data.
     *
     * This method does not accept any data. Supply an empty object.
     *
     * @returns An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    logout(customHeaders?: Function): Observable<any>;
    /**
     * Trigger user's identity verification with configured verifyOptions
     *
     *  id Admin id
     *
     *  data Request data.
     *
     * This method does not accept any data. Supply an empty object.
     *
     * @returns An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    verify(id: any, customHeaders?: Function): Observable<any>;
    /**
     * Confirm a user registration with identity verification token.
     *
     * @param uid
     *
     * @param token
     *
     * @param redirect
     *
     * @returns An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    confirm(uid: any, token: any, redirect?: any, customHeaders?: Function): Observable<any>;
    /**
     * Reset password for a user with email.
     *
     *  data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    resetPassword(options: any, customHeaders?: Function): Observable<any>;
    /**
     * Change a user's password.
     *
     *  data Request data.
     *
     *  - `oldPassword` – `{string}` -
     *
     *  - `newPassword` – `{string}` -
     *
     * @returns An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    changePassword(oldPassword: any, newPassword: any, customHeaders?: Function): Observable<any>;
    /**
     * Reset user's password via a password-reset token.
     *
     *  data Request data.
     *
     *  - `newPassword` – `{string}` -
     *
     * @returns An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    setPassword(newPassword: any, customHeaders?: Function): Observable<any>;
    /**
     * Creates a new instance in accessTokens of this model.
     *
     *  id Admin id
     *
     *  data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns  An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Admin` object.)
     * </em>
     */
    createManyAccessTokens(id: any, data?: any[], customHeaders?: Function): Observable<any>;
    /**
     * @ngdoc method
     * @name sdk.Admin#getCurrent
     * @methodOf sdk.Admin
     *
     * @description
     *
     * Get data of the currently logged user. Fail with HTTP result 401
     * when there is no user logged in.
     *
     * @returns object An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     */
    getCurrent(filter?: LoopBackFilter): Observable<any>;
    /**
     * Get data of the currently logged user that was returned by the last
     * call to {@link sdk.Admin#login} or
     * {@link sdk.Admin#getCurrent}. Return null when there
     * is no user logged in or the data of the current user were not fetched
     * yet.
     *
     * @returns object An Account instance.
     */
    getCachedCurrent(): any;
    /**
     * Get data of the currently logged access tokern that was returned by the last
     * call to {@link sdk.Admin#login}
     *
     * @returns object An AccessToken instance.
     */
    getCurrentToken(): AccessToken;
    /**
     * @name sdk.Admin#isAuthenticated
     *
     */
    isAuthenticated(): boolean;
    /**
     * @name sdk.Admin#getCurrentId
     *
     * @returns object Id of the currently logged-in user or null.
     */
    getCurrentId(): any;
    /**
     * The name of the model represented by this $resource,
     * i.e. `Admin`.
     */
    getModelName(): string;
}

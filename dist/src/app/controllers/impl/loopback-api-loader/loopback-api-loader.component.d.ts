import { GenericApiLoader } from '../../generic-api-loader.';
import { BaseLoopBackApi, User } from '../../../sdk';
export interface LoaderSearch {
    property: string;
    value: string;
    properties?: [string];
}
export declare class LoopbackApiLoaderComponent<Model, ModelApi extends BaseLoopBackApi> implements GenericApiLoader {
    protected loaderApi: ModelApi;
    static sdkModels: any;
    loaderConfig: {
        page: number;
        limit: number;
        order: string;
    };
    className: string;
    protected loaderPage: number;
    loaderItems: [Model];
    loaderCount: number;
    protected loaderSearch: LoaderSearch;
    loaderItemModel: typeof User;
    modelProperties: {};
    modelDefinition: {
        name: string;
        plural: string;
        path: string;
        idName: string;
        properties: {
            "realm": {
                name: string;
                type: string;
            };
            "username": {
                name: string;
                type: string;
            };
            "email": {
                name: string;
                type: string;
            };
            "emailVerified": {
                name: string;
                type: string;
            };
            "id": {
                name: string;
                type: string;
            };
            "password": {
                name: string;
                type: string;
            };
        };
        relations: {
            accessTokens: {
                name: string;
                type: string;
                model: string;
                relationType: string;
                keyFrom: string;
                keyTo: string;
            };
        };
    };
    baseRoute: string;
    createRoute: string;
    editRoute: string;
    apiRoute: string;
    constructor(loaderApi: ModelApi);
    private loadModels();
    private loadRoutes();
    private loadModel();
    private getFilter();
    getWhereAny(properties: any, value: any): {
        or: any[];
    };
    loadData(): void;
    apiSearch($event: any): void;
    handleError(error: any): void;
    nextPage(): void;
    prevPage(): void;
}

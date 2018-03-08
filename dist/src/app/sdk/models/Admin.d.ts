export interface AdminInterface {
    "realm"?: string;
    "username"?: string;
    "email": string;
    "emailVerified"?: boolean;
    "id"?: any;
    "password"?: string;
    accessTokens?: any[];
}
export declare class Admin implements AdminInterface {
    "realm": string;
    "username": string;
    "email": string;
    "emailVerified": boolean;
    "id": any;
    "password": string;
    accessTokens: any[];
    constructor(data?: AdminInterface);
    /**
     * The name of the model represented by this $resource,
     * i.e. `Admin`.
     */
    static getModelName(): string;
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of Admin for dynamic purposes.
    **/
    static factory(data: AdminInterface): Admin;
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition(): {
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
}

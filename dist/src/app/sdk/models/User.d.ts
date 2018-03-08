export interface UserInterface {
    "realm"?: string;
    "username"?: string;
    "email": string;
    "emailVerified"?: boolean;
    "id"?: any;
    "password"?: string;
    accessTokens?: any[];
}
export declare class User implements UserInterface {
    "realm": string;
    "username": string;
    "email": string;
    "emailVerified": boolean;
    "id": any;
    "password": string;
    accessTokens: any[];
    constructor(data?: UserInterface);
    /**
     * The name of the model represented by this $resource,
     * i.e. `User`.
     */
    static getModelName(): string;
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of User for dynamic purposes.
    **/
    static factory(data: UserInterface): User;
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

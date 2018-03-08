import { GenericApiItemEditor } from '../../generic-api-item-editor.';
import { ActivatedRoute } from '@angular/router';
import { BaseLoopBackApi } from '../../../sdk';
export declare class LoopbackApiItemEditorComponent<Model, ModelApi extends BaseLoopBackApi> implements GenericApiItemEditor {
    protected api: ModelApi;
    protected route: ActivatedRoute;
    item: Model;
    className: any;
    protected selectedId: any;
    formProperties: any;
    backRoute: any;
    baseRoute: string;
    constructor(api: ModelApi, route: ActivatedRoute);
    loadParams(): void;
    loadData(): Promise<void | Model>;
    protected handleError(error: any): void;
    createItem(): Promise<void | Model>;
    editItem(): Promise<void | {}>;
    onSubmit($event: any): void;
    removeItem(): void;
}

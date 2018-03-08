import { Component, OnInit } from '@angular/core';
import { GenericApiItemEditor } from '../../generic-api-item-editor.';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BaseLoopBackApi } from '../../../sdk';

export class LoopbackApiItemEditorComponent<Model> implements GenericApiItemEditor {

  public item: Model;
  public className;
  protected selectedId;

  public formProperties;

  backRoute;
  baseRoute = '/dashboard';

  constructor(protected api, protected route: ActivatedRoute) {
    const model = this.api.getModel();
    this.item = new model();
    this.className = this.item.constructor.name;
    const constr: any = this.item.constructor;
    this.backRoute = `${this.baseRoute}/${constr.getModelDefinition().path.toLowerCase()}`;
  }

  loadParams() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.selectedId = params.id;
        this.loadData();
      }
    });

  }

  loadData() {
    return this.api.findById(this.selectedId).toPromise().then(
      (item: Model) => this.item = item
    ).catch(this.handleError);
  }

  protected handleError(error) {
    alert(error.message);
  }


  createItem() {
    return this.api.create(this.item).toPromise().catch(this.handleError);
  }

  editItem() {
    return this.api.upsert(this.item).toPromise().catch(this.handleError);
  }

  onSubmit($event) {
    this.item = $event;
    let promise: any = this.api.create(this.item).toPromise();
    if (this.item['id']) {
      promise = this.api.upsert(this.item).toPromise();
    }

    promise.then((item: Model) => {
      this.item = item;
      alert('Element modified');
    }).catch(this.handleError);
  }

  removeItem() {
    const resp = confirm("Are you sure you want to remove?")
    if (!resp)
      return;
    this.api.deleteById(this.item['id']).toPromise().then(
      item => { alert('item removed'); window.history.back() },
      this.handleError
    );
  }

}

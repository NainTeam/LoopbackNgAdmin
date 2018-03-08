import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { GenericApiLoader } from '../../generic-api-loader.';
import { BaseLoopBackApi, SDKModels, User } from '../../../sdk';


export interface LoaderSearch {
  property: string;
  value: string;
  properties?: [string];
}

export class LoopbackApiLoaderComponent<Model> implements GenericApiLoader {
  static sdkModels = null;
  loaderConfig = {
    page: 0,
    limit: 15,
    order: 'date'
  };

  public className = '';

  protected loaderPage = this.loaderConfig.page;

  loaderItems: [Model];

  loaderCount = 0;

  protected loaderSearch: LoaderSearch = { property: '', value: '' };

  loaderItemModel = User;

  modelProperties = {};
  modelDefinition = User.getModelDefinition();

  baseRoute = '/dashboard';

  createRoute = '/dashboard/topics/create';
  editRoute = '/dashboard/topics';

  apiRoute = '';

  constructor(protected loaderApi) {
    this.loadModels();
    this.loadModel();
    this.loadRoutes();
  }

  private loadModels() {
    if (!LoopbackApiLoaderComponent.sdkModels) {
      LoopbackApiLoaderComponent.sdkModels = new SDKModels();
    }
  }

  private loadRoutes() {
    this.apiRoute = this.modelDefinition.path.toLowerCase();

    this.editRoute = `${this.baseRoute}/${this.apiRoute}`;
    this.createRoute = `${this.editRoute}/create`;
  }

  private loadModel() {
    this.loaderItemModel = LoopbackApiLoaderComponent.sdkModels.get(this.loaderApi.getModelName());


    this.modelDefinition = this.loaderItemModel.getModelDefinition();

    this.modelProperties = this.modelDefinition.properties;

  }

  private getFilter() {
    const filter = { limit: this.loaderConfig.limit, skip: this.loaderConfig.limit * this.loaderPage };

    if (this.loaderSearch) {
      const search = this.loaderSearch;
      const name = search.property;
      if (search.property !== 'any') {
        filter['where'] = {};
        filter['where'][name] = { 'like': search.value, options: 'i' };
      } else {
        filter['where'] = this.getWhereAny(search.properties, search.value);
      }
    }

    return filter;
  }

  getWhereAny(properties, value) {
    const where = { or: [] };
    for (let i in properties) {
      const name = properties[i];
      const type = this.modelProperties[name].type;
      if (type != 'Date') {
        var item = {};
        item[name] = { 'like': value, options: 'i' };
        where.or.push(item);
      }
    }
    return where;

  }


  loadData() {
    this.loaderApi.find(this.getFilter()).toPromise().then(
      (items: [Model]) => {
        this.loaderItems = items;
      }
    );

    this.loaderApi.count().toPromise().then(
      count => this.loaderCount = count.count
    ).catch(this.handleError);
  }


  apiSearch($event) {
    this.loaderSearch = $event;
    this.loadData();
  }


  handleError(error) {
    alert(error.message ? error.message : error);
  }

  nextPage() {
    this.loaderPage++;
    this.loadData();
  }

  prevPage() {
    this.loaderPage--;
    this.loadData();
  }


}

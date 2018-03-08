/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Post } from '../../models/Post';
import { Blogger } from '../../models/Blogger';
import { Like } from '../../models/Like';
import { Comment } from '../../models/Comment';
import { Container } from '../../models/Container';
import { Image } from '../../models/Image';
import { Admin } from '../../models/Admin';
import { Collection } from '../../models/Collection';
import { Topic } from '../../models/Topic';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    Post: Post,
    Blogger: Blogger,
    Like: Like,
    Comment: Comment,
    Container: Container,
    Image: Image,
    Admin: Admin,
    Collection: Collection,
    Topic: Topic,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}

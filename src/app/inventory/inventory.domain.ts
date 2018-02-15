import { Upload } from '../shared/services/upload';

export interface ICategory {
  title: string;
  id: number;
}

export interface ItemUser {
  id: string;
  name: string;
}

export interface IIventoryItem {
  createdAt?: string;
  updatedAt?: string;
  title: string;
  category: ICategory;
  holder: ItemUser;
  owner: ItemUser;
  media: IUpload;
}

export interface IInventoryRequest {
  createdAt?: string;
  updatedAt?: string;
  user: ItemUser;
  id?: string;
}

export interface IUpload {
  $key: string;
  file: any;
  name:string;
  url:string;
  progress:number;
  createdAt: Date;
}
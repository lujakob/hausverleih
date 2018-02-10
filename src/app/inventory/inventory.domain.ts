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
}
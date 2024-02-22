export type userData = {
  name?: string;
  email?: string;
  address?: string;
  image?: string;
  phone?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  admin?: boolean;
};

export type ProfileFormProps = {
  userData: any;
  sessionUserData: any;
  loading: boolean;
  onSubmit: (event: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export interface Category {
  _id: number | undefined;
  categories: string;
}

export type AddItems = {
  id?:string
  onsubmit: (event: React.FormEvent) => void;
  setCategory: (category: string) => void;
  itemname: string;
  setItemname: (itemName: string) => void;
  description: string;
  setDescription: (description: string) => void;
  price: string;
  setPrice: (price: string) => void;
  category: string;
  loading?:boolean
  onclick?: () => Promise<void>
};

export type CardItems ={
  _id:string;
  name: string;
  price: string;
  description: string;
  pictures?: string | undefined
  category:string

}
export interface User {
  _id: string;
  name: string;
  email: string;
  image?: string;
  admin: boolean;
}

export type Order = {
  _id: string;
  itemName: string;
  userName: string;
  email: string;
  price: number;
  picture:string;
}
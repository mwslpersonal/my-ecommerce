import { Product } from "./product";

export type Kit = {
  id?: string;
  name: string;
  products: {
    id: string;
    quantity: string;
  }[];
  quantity: string;
  images: string[];
  description?: string;
};

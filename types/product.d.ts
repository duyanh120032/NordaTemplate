export interface Product {
  id: number;
  title: string;
  catSlug: string;
  price: number;
  image: string;
  stock: number;
  desc: string;
  views: number;
}
export interface ProductDetail extends Product {
  colors: string[];
  sizes: string[];
}
export interface CartItem extends ProductDetail {
  size: string;
  quantity: number;
  color: string;
}

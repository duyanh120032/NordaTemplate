import { CartItem } from "./product.d";
export interface Order {
  id: number;
  created_at: string;
  total: number;
  items: CartItem[];
  shipping_cost: number;
  shipping_data: object;
  user_email: string;
  status: string;
}

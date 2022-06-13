import { CartItem, Product } from "./../types/product.d";
import { defineStore } from "pinia";

const initialState = {
  items: [] as CartItem[],
  wishlist: [] as Product[],
  total: 0,
};

export const useCartStore = defineStore("cart", {
  state: () => {
    return initialState;
  },

  actions: {
    addToCart(product: CartItem) {
      const index = this.items.findIndex((item) => {
        return item.id === product.id;
      });
      if (index === -1) {
        this.items.push({
          ...product,
        });
      } else {
        this.items[index].quantity++;
      }
    },
    calculateTotal() {
      const { items } = this.state;
      let total = 0;
      items.forEach((item: CartItem) => {
        total += item.price * item.quantity;
      });
      this.state.total = total;
    },
    decQuantity(id: number) {
      console.log("🚀 ~ file: cart.ts ~ line 49 ~ decQuantity ~ id", id);

      const index = this.items.findIndex((item: { id: number }) => {
        return item.id === id;
      });
      if (index !== -1) {
        if (this.items[index].quantity > 1) {
          this.items[index].quantity--;
        } else {
          this.items.splice(index, 1);
        }
      }
    },
    incQuantity(id: number) {
      console.log("🚀 ~ file: cart.ts ~ line 62 ~ incQuantity ~ id", id);

      const index = this.items.findIndex((item: { id: number }) => {
        return item.id === id;
      });
      if (index !== -1) {
        this.items[index].quantity++;
      }
    },
    removeCartItem(id: number) {
      const index = this.items.findIndex((item: { id: number }) => {
        return item.id === id;
      });
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    },
  },
  getters: {
    getTotal: (state) => {
      return state.items.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },
    getItems: (state) => {
      return state.items;
    },
    getWishlist: (state) => {
      return state.wishlist;
    },
    getCount: (state) => {
      return state.items.length;
    }
  },
});

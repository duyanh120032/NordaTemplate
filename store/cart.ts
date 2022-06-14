
import { CartItem, Product } from "./../types/product.d";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

const toast = useToast();

const initialState = {
  items: [] as CartItem[],
  wishlist: [] as CartItem[],
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
        toast.success(`${product.title} added to cart`);
      } else {
        this.items[index].quantity++;
        toast.success(`${product.title} quantity increased`);
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
        toast.success(`${this.items[index].title} removed from cart`);
      }
    },
    removeWishlistItem(id: number) {
      const index = this.wishlist.findIndex((item: { id: number }) => {
        return item.id === id;
      });
      if (index !== -1) {
        this.wishlist.splice(index, 1);
        toast.success(`${this.wishlist[index].title} removed from wishlist`);
      }
    },
    addToWishlist(product: CartItem) {
      const index = this.wishlist.findIndex((item: { id: number }) => {
        return item.id === product.id;
      });
      if (index === -1) {
        this.wishlist.push({
          ...product,
        });
        toast.success(`${product.title} added to wishlist`);
      } else {
        this.wishlist[index].quantity++;
        toast.success(`${product.title} quantity increased`);
      }
    },
    incWishlistQuantity(id: number) {
      const index = this.wishlist.findIndex((item: { id: number }) => {
        return item.id === id;
      });
      if (index !== -1) {
        this.wishlist[index].quantity++;
      }
    },
    decWishlistQuantity(id: number) {
      const index = this.wishlist.findIndex((item: { id: number }) => {
        return item.id === id;
      });
      if (index !== -1) {
        if (this.wishlist[index].quantity > 1) {
          this.wishlist[index].quantity--;
        } else {
          this.wishlist.splice(index, 1);
        }
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
    },
    getCountWishlist: (state) => {
      return state.wishlist.length;
    },
   
  },
});

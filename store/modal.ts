import { ProductDetail } from './../types/product.d';
import { defineStore } from "pinia";
import { Product } from "~~/types/product";

export const useModalStore = defineStore("ProductModal", {
  state: () => {
    return {
      product: null as ProductDetail,
    };
  },

  actions: {
    set(product: Product) {
      this.product = product;
    },
    remove() {
      this.product = null ;
    },
  },
});

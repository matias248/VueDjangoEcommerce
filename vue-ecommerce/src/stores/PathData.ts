import type { PathData } from "@/utils/utilsFunctions"
import { defineStore } from "pinia"


export const usePathDataStore = defineStore('pathData', {
  state: (): PathData => {
    return {
      storeName: undefined,
      productName: undefined,
      storeId: undefined,
      productId: undefined,
      inStores: true,
      inProducts: true
    }
  },
  getters: {
    getStoreName: (state) => state.storeName,
    getProductName: (state) => state.productName,
    getStoreId: (state) => state.storeId,
    getProductId: (state) => state.productId,
    getInStores: (state) => state.inStores,
    getInProducts: (state) => state.inProducts,
  },
  actions: {
    setStoreName(newString: string | undefined) {
      this.storeName = newString;
    },
    setProductName(newString: string | undefined) {
      this.productName = newString;
    },
    setStoreId(newId: number | undefined) {
      this.storeId = newId;
    },
    setProductId(newId: number | undefined) {
      this.productId = newId;
    },
    setInStores(value: boolean) {
      this.inStores = value;
    },
    setInProducts(value: boolean) {
      this.inProducts = value;
    },
    setAll(inProducts: boolean, inStores: boolean, storeId: number | undefined, productId: number | undefined, productName?: string, storeName?: string) {
      this.inProducts = inProducts;
      this.inStores = inStores;
      this.productId = productId;
      this.storeId = storeId;
      this.productName = productName;
      this.storeName = storeName;
    },
  },
})
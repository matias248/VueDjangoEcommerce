import type { CartItemDTO } from "@/dto/CartItem";
import type { ProductDTO } from "@/dto/ProductDTO";
import { defineStore } from "pinia"
import { computed, ref, type Ref } from "vue";


export const useCartDataStore = defineStore('cartData', ()=>{
    const cartDataMap :Ref<Map<number,CartItemDTO>>= ref(new Map());

    const numberOfElements = computed(()=>getTotalProductsElements(cartDataMap.value));


    function  changeQuantityInCartShop (object: { cartItem: CartItemDTO, quantity: number }){
      let { cartItem, quantity } = object;
      if (quantity == 0) {
        cartDataMap.value.delete(cartItem.id);
      }
      else {
        let newCartItem: CartItemDTO = cartItem;
        newCartItem.quantity = quantity;
        cartDataMap.value.set(cartItem.id,cartItem);
      }
    }

    function  changeQuantityInCartShopOfProduct(object: { product: ProductDTO, quantity: number }){
      let { product, quantity } = object;
      let newCartItem: CartItemDTO = {...product,quantity};
      if (quantity == 0) {
        cartDataMap.value.delete(newCartItem.id);
      }
      else {
        cartDataMap.value.set(newCartItem.id,newCartItem);
      }
    }
    
    function $reset() {
      cartDataMap.value = new Map();
    }
    return {$reset,numberOfElements,changeQuantityInCartShop,cartDataMap,changeQuantityInCartShopOfProduct}
   
})

function getTotalProductsElements(cartShopList: Map<number,CartItemDTO>): number {
  let totalElements = 0;
  cartShopList.forEach((currentValue)=> {
    totalElements+= currentValue.quantity
  })
  return totalElements;
}
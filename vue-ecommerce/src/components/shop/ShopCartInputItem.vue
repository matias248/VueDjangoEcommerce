<script setup lang="ts">
import type { CartItemDTO } from '@/dto/CartItem';
import IconNoImageSet from '../icons/IconNoImageSet.vue';
import MinusPlusInput from './MinusPlusInput.vue';
import { useCartDataStore } from '@/stores/CartData';

const cartDataStore = useCartDataStore();
const props = defineProps<{cartItem:CartItemDTO,quantityInCart?:number}>();

</script>
<template>
<div v-if="cartItem"
  v-bind:id="'ShopCartItem' + cartItem.id"
  class="h-[13.75rem] w-full min-w-128 md:min-w-56 bg-white rounded-lg shadow dark:bg-gray-800 p-1"
>
  <div
    v-bind:id="'ShopCartItemImage' + cartItem.id"
    class="size-[4.5rem] mt-[0.5rem] mx-auto"
  >
    <img v-if="cartItem.imageUrl"
      class="h-full max-w-full rounded-lg object-cover mx-auto text-center dark:text-white"
      :src="cartItem.imageUrl"
      alt="error loading image"
    />
    <div v-if="!cartItem.imageUrl"
      v-bind:id="'divNoImageSet' + cartItem.id"
      class="h-full max-w-full rounded-lg"
    >
        <IconNoImageSet />  
    </div>
  </div>
  <div
    :id="'textShopCart' + cartItem.id"
    class="mt-[0.5rem] max-w-full h-[3.5rem] mx-1 text-center overflow-auto"
  >
    <div :id="'1textShopCartItem' + cartItem.id" class="w-full">
      <div
        class="text-xl font-bold text-gray-900 dark:text-white leading-7 whitespace-nowrap"
      >
        {{ cartItem.name }}
      </div>
    </div>
    <div class="w-full">
      <p
        :id="'2textShopCartItem' + cartItem.id"
        class="text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap leading-7"
      >
        {{ cartItem.price + "€" }}
      </p>
    </div>
  </div>
  <div>
    <div class="h-[4rem] flex justify-center items-center rounded-lg">
    <MinusPlusInput :id="'ShopCartItemMinusPlus'+cartItem.id" :quantityInCart="cartItem.quantity"  @change="(newValue:number)=>cartDataStore.changeQuantityInCartShop({cartItem:props.cartItem,quantity:newValue})"/>
    </div>
  </div>
</div>

</template>
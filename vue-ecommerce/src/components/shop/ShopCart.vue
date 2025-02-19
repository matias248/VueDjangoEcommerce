<script setup lang="ts">
import IconCross from '../icons/IconCross.vue';
import { useCartDataStore } from '@/stores/CartData';
import ShopCartInputItem from '@/components/shop/ShopCartInputItem.vue';
import { storeToRefs } from 'pinia';
import { getTotalPriceCart } from '@/utils/utilsFunctions';
const cartListVisible = defineModel('cartListVisible')
const submitButtonVisible = defineModel('submitButtonVisible')

const crossFunction = () =>{
  cartListVisible.value = false;
}
const cartDataStore = useCartDataStore();
const {cartDataMap} = storeToRefs(cartDataStore);
const submitOrderFunction = () => {
  if( cartDataMap.value.size > 0 )
    submitButtonVisible.value = !submitButtonVisible.value;
}
</script>
<template>
<div class="fixed h-[100dvh] bg-gray-300 dark:bg-gray-500 top-0 right-0 max-[460px]:w-[60%] w-[40%] md:w-[30%] z-10 rounded-l-lg flex flex-col gap-1 px-2">
<div v-on:click="crossFunction()" id="crossShopCart" class="size-[2.5rem] relative -left-1"  >
  <IconCross class="dark:fill-white"/>
</div>
<div class="dark:text-white font-bold self-center text-xl">Cart shop</div>
<div class="flex-1 overflow-auto mb-2">
  <div class="flex flex-col gap-1  overflow-auto h-[100%]  ">
  <template v-for="(mapElement,index) in cartDataMap">
        <ShopCartInputItem :cartItem="mapElement[1]"/>

  </template>
    <div v-if="cartDataMap===undefined || cartDataMap.size === 0" id="emptyCartShop" class=" dark:text-white text-center  my-auto">
          The cart shop is empty
    </div>
  </div>
</div>
<div class="mb-2">
  <div class="dark:text-white text-xl overflow-x-auto whitespace-nowrap">
    Total: {{ getTotalPriceCart(cartDataMap) }} €
  </div>
</div>
<div class="mb-2">
  <button name="confirmDialogShopButton" @click="submitOrderFunction" class=" bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 dark:text-white ">Submit Order</button>
</div>
</div>

</template>
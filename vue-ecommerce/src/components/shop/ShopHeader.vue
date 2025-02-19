<script setup lang="ts">
import IconShop from '../icons/IconShop.vue';
import SearchBar from './SearchBar.vue';
import ShopSelectorInput from '../shop/ShopSelectorInput.vue'
import { useCartDataStore } from '@/stores/CartData';
import type { StoreDTO } from '@/dto/StoreDTO';
import {useVisibility} from '@/hooks/useVisibilityHook'

const { target, isVisible } = useVisibility()


const cartDataStore = useCartDataStore();

const cartListVisible = defineModel('cartListVisible')
const textFilter = defineModel<string>('textFilter');
const selectedStore = defineModel<StoreDTO>('selectedStore');
  
const onClickCartButtonFunction=(newValue:boolean)=>{
   cartListVisible.value = newValue;
}
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
<template>
<header class="h-[64px] mb-4 sm:mb-8">
  <div
    class="bg-slate-100 border-gray-200 dark:bg-gray-800 max-w-[1000px] mx-auto w-[90%] rounded-lg"
  >
    <div class="flex items-center max-w-full gap-[4px] justify-between mx-2">
      <div class="hidden sm:block">
        <ShopSelectorInput v-model:selectedStore="selectedStore"/>
      </div>

      <div class="flex-1">
        <SearchBar id="filterproducts" text-hover="" v-model="textFilter"/>
      </div>

      <div class="flex items-center lg:order-2" ref=target>
        <button
          id="shoppingCart"
          class="relative bg-blue-600 hover:bg-blue-700 rounded-full p-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
          v-on:click="onClickCartButtonFunction(true)"
        >
          <div class="size-6"><IconShop/></div>
         
          <div v-if="cartDataStore.numberOfElements != 0"
            v-bind:class="
              'absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full my-auto text-center flex items-center justify-center overflow-hidden ' +
              (cartDataStore.numberOfElements  > 9 ? 'size-6 ' : 'size-5 ')"
          >
            <div >
              {{ cartDataStore.numberOfElements  > 99 ? "+99" : cartDataStore.numberOfElements }}
            </div>
          </div>
          
        </button>
      </div>
    </div>
  </div>
  <div>    
</div>
  <Transition name="fade" mode="out-in">
  <div class="fixed w-[100%] top-4 pointer-events-none" v-if="!isVisible">
    <div class="mx-auto max-w-[1000px] w-[90%] flex flex-row-reverse px-2 py-1">
      <button
        id="shoppingCartstiky"
        v-bind:class="'relative bg-blue-600 hover:bg-blue-700 rounded-full p-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none '
         + (!isVisible ? 'pointer-events-auto' : 'pointer-events-none')"
        v-on:click="onClickCartButtonFunction(true)"
      >
        <div class="size-6"><IconShop/></div>
        
        <div v-if="cartDataStore.numberOfElements != 0"
            v-bind:class="
              'absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full my-auto text-center flex items-center justify-center overflow-hidden ' +
              (cartDataStore.numberOfElements  > 9 ? 'size-6 ' : 'size-5 ')"
          >
            <div>
              {{ cartDataStore.numberOfElements  > 99 ? "+99" : cartDataStore.numberOfElements }}
            </div>
        </div>
      </button>
    </div>
  </div>
</Transition>

</header>

</template>
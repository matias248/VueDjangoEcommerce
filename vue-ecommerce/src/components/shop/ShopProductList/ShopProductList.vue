<script setup lang="ts">
import type { ProductDTO } from '@/dto/ProductDTO';
import { ref } from 'vue';
import IconSpinner from '../../icons/IconSpinner.vue';
import ShopNavigationInputs from '../ShopNavigationInputs.vue';
import ShopProductImageGallery from './ShopProductImageGallery.vue';
import { useCartDataStore } from '@/stores/CartData';
import { storeToRefs } from 'pinia';

defineProps<{products:ProductDTO[],isLoading: boolean}>();
const pageIndex = defineModel<number>('pageIndex');
const pageTotal = defineModel<number>('pageTotal');
const cartDataStore = useCartDataStore();
const {cartDataMap} = storeToRefs(cartDataStore);


</script>
<template>
    <div
  id="shopProductListContainer"
  class="max-w-[1200px] mx-auto w-[90%] flex flex-col"
>
<div class="self-end">
  <ShopNavigationInputs v-model="pageIndex" v-model:total-pages="pageTotal" />
</div>
 
  <div v-if="!isLoading && (products === undefined || (!isLoading &&products && products.length ===
  0) )"
    class="dark:text-white rounded-lg min-h-[300px] dark:bg-gray-600 bg-gray-300 p-2 w-full flex items-center justify-center"
  >
    No items found
  </div>

  <div v-if="isLoading" class="flex justify-center"><IconSpinner/></div>

  <div v-if="!isLoading && products && products.length > 0"
    id="shopProductList"
    class="grid grid-cols-1 min-[1040px]:grid-cols-3 xl:grid-cols-4 md:gap-y-4 gap-y-6 rounded-lg min-h-[300px] dark:bg-gray-600 bg-gray-300 p-2 md:justify-items-center"
  >
        <div v-for="product in products" class="w-full min-[1040px]:w-[258px]" :id="'ShopProductElementGalleryContainer' + product.id" :key="product.id">
          <ShopProductImageGallery :product="product" :quantityInCart="cartDataMap.get(product.id)?.quantity"/>
        </div>
       
     
  </div>
  
</div>

</template>
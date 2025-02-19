<script setup lang="ts">
import IconCross from '@/components/icons/IconCross.vue';
import IconNoImageSet from '@/components/icons/IconNoImageSet.vue';
import { ref, type Ref } from 'vue';
import MinusPlusInput from '../MinusPlusInput.vue';
import { useCartDataStore } from '@/stores/CartData';
import type { ProductDTO } from '@/dto/ProductDTO';
const showDescription:Ref<boolean> = ref(false);
defineProps<{product:ProductDTO,quantityInCart?:number}>();
const cartDataStore = useCartDataStore();

</script>
<template>

<div v-if="product"
  :id="'ShopProductElementGallery' + product.id"
  class="h-[18.75rem] min-w-64 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
>
<template v-if="!showDescription">
    <div
    :id="'ShopImageProductGallery' + product.id"
    class="w-56 mt-[0.5rem] mx-auto h-[7rem]"
  >
   
    <img v-if="product.imageUrl"
      class="h-[7rem] max-w-full rounded-lg object-cover mx-auto text-center dark:text-white"
      :src="product.imageUrl"
      alt="error loading image"
    />
   
    <div v-if="!product.imageUrl"
      :id="'divNoImageSet' + product.id"
      class="h-[7rem] max-w-full rounded-lg"
    >
      <IconNoImageSet/>
    </div>
    
  </div>
  <div
    :id="'textShopProductGallery' + product.id"
    class="mt-[0.5rem] max-w-full h-[6rem] mx-1 text-center overflow-auto"
  >
    <div :id="'1textShopProductGallery' + product.id " class="w-full">
      <div
        class="text-2xl font-bold text-gray-900 dark:text-white leading-8 whitespace-nowrap"
      >
        {{ product.name }}
      </div>
    </div>
    <div class="w-full">
      <p
        :id="'1textShopProductGallery' + product.id"
        class="text-2xl font-bold text-gray-900 dark:text-white whitespace-nowrap leading-8"
      >
        {{ product.price + product.currency }}
      </p>
    </div>
    <div class="flex flex-row-reverse items-center max-[1040px]:justify-center">
      <button
        :id="'learnMore' + product.id"
        class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-2 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        v-on:click="()=>{showDescription=!showDescription}"
      >
        Learn more
      </button>
    </div>
  </div>
  <div>
    <div class="h-[4rem] flex justify-center items-center rounded-lg">
      <MinusPlusInput :id="'ShopProductElementGalleryMinusPlus'+product.id" :quantityInCart="quantityInCart ?? 0"
      @change="(newValue:number)=>cartDataStore.changeQuantityInCartShopOfProduct({product,quantity:newValue})"/>
    </div>
  </div>
</template>
<template v-if="showDescription">
  <div 
    :id="'descriptionProductCrossIcon' + product.id"
    class="size-[3rem]"
  >
    <IconCross class="dark:fill-white" v-on:click="()=>{showDescription=!showDescription}"/>
  </div>
  <div
    :id=" 'descriptionProductText' + product.id "
    class="dark:text-white overflow-y-auto h-[15.25rem] mx-1"
  >
    {{ product.description }}
  </div>
</template> 
</div>
</template>
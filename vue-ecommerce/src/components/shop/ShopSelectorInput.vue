<script setup lang="ts">
import type { StoreDTO } from '@/dto/StoreDTO';
import  ArrowDownIcon  from '../icons/IconArrowDown.vue';
import ShopSelectorDialog from './ShopDialog/ShopSelectorDialog.vue';
import { ref } from 'vue';
const selectedStore = defineModel<StoreDTO>('selectedStore');

const shopSelectorDialog=ref(false);

</script>
<style>
.slide-enter-active {
  transition: all 1s ease-in;
}

.slide-leave-active {
  transition: all 1s ;
}

.slide-enter-from{
  transform: translateX(-100%);
}

.slide-leave-to {
  transform: translateX(-100%);

}
</style>
<template>
<Transition name="slide">
<ShopSelectorDialog v-if="shopSelectorDialog" v-model="selectedStore" v-model:shopSelectorDialog="shopSelectorDialog"/>
</Transition>
<div
  id="ShopSelectorInput"
  class="flex h-full border-2 border-gray-400 rounded-lg dark:border-slate-700"
  @click="()=>shopSelectorDialog=!shopSelectorDialog"
>
  <div class="w-[144px] ml-2">
    <p class="text-sm dark:text-white truncate max-w-full">My store</p>
    <p class="text-xs dark:text-white truncate max-w-full">
      {{ selectedStore?.name ?? "Store not selected" }}
    </p>
  </div>
  <div class="size-[40px] flex items-center justify-items-center">
    <ArrowDownIcon class="dark:fill-white" @click="()=>console.log(selectedStore)" />
  </div>
</div>

</template>
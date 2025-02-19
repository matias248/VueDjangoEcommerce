<script setup lang="ts">
import { currentStores } from '@/LocalData/Stores';
import ShopStoreInput from './ShopStoreInput.vue';
import type { StoreDTO } from '@/dto/StoreDTO';

const selectedStore = defineModel<StoreDTO>('selectedStore');
const temporalStore = defineModel<StoreDTO>('temporalStore');
defineProps<{
  stores: StoreDTO[]
}>()
</script>
<template>
<div class="flex flex-col gap-1 overflow-auto">
  <ShopStoreInput v-for="store in stores" :store="store" :v-model="selectedStore" v-model:temporalStore="temporalStore"/>
</div>

  
</template>
<script setup lang="ts">
import DisplayNotFound from '../shared/DisplayNotFound.vue';
import IconSpinner from '../icons/IconSpinner.vue';
import CreateItemButton from '../shared/CreateItemButton.vue';
import type { ButtonProps } from '@/utils/utilsFunctions';
import { onMounted, ref, type Ref } from 'vue'
import type { ProductDTO } from '@/dto/ProductDTO';
import { getProductsWithstore } from '@/services/productService';
import { useRoute, useRouter } from 'vue-router';
import ProductItem from './ProductItem.vue';
import { usePathDataStore } from '@/stores/PathData';

  const router = useRouter()
  const title ="List of products";
  let isLoading = ref(true);
  let errorLoading = ref(false);
  let products:Ref<ProductDTO[]> = ref([]);
  const pathData = usePathDataStore();
  
  const createNewItemProps: ButtonProps = {
  functionToDo: () => { router.push(`products/new`)},
  title: 'Create a product'
  };
  const route = useRoute();
  let storeId: string | undefined=route.params.id?.toString();
  onMounted(() => {
    const storeIdNumber = +storeId;
    if(storeIdNumber && !isNaN(storeIdNumber)){
      getProductsWithstore(storeIdNumber).then((response)=>{
      products.value = response.products;
      pathData.setAll(true,true,response.store.id,undefined,undefined,response.store.name);
    }).catch(()=>{
      errorLoading.value=true;
      console.log("fail to load new items")});
    }
    else{
      errorLoading.value=true;
    }
    isLoading.value = false;
})


defineProps<{
}>()
</script>

<template>
<div class="mx-auto max-w-[1600px] mx-auto w-[90%]">
  <div v-if="!isLoading && products && !errorLoading">
    <div class="text-4xl text-center mb-8 dark:text-white">{{ title }}</div>
    <div 
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-y-4 gap-y-6 pb-4 md:justify-items-center"
    >
    <ProductItem v-for="product in products" :product="product" />
    </div>
  </div>
  <CreateItemButton :button-props="createNewItemProps" />
  <DisplayNotFound v-if="!isLoading && errorLoading"/>
  <div v-if="isLoading" class="flex justify-center"><IconSpinner/></div>
</div>
</template>
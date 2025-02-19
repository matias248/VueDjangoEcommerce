<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref, watch, type Reactive, type Ref } from 'vue';
import OrderConfirmModal from './OrderConfirmModal.vue';
import ShopCart from './ShopCart.vue';
import ShopHeader from './ShopHeader.vue';
import ShopSelectorInput from './ShopSelectorInput.vue';
import ShopCategoryList from './ShopCategory/ShopCategoryList.vue';
import ShopProductList from './ShopProductList/ShopProductList.vue';
import type { ProductDTO } from '@/dto/ProductDTO';
import { getProductsPublicUrl } from '@/services/productService';
import type { StoreDTO } from '@/dto/StoreDTO';
import { useCartDataStore } from '@/stores/CartData';

const orderConfirmModal = ref(false);
const cartListVisible = ref(false);
const isLoading = ref(true);

let selectedStore:Ref<StoreDTO | undefined> = ref();
    
const products:Ref<ProductDTO[]>=ref([]);
const filterCategoryEntries:Ref<[string,boolean][]> = ref([]);
const pageIndex:Ref<number> = ref(1);
const pageTotal:Ref<number> = ref(1);
const textFilter:Ref<string> = ref("");
const categoriesSelected = computed(() => {
  return filterCategoryEntries.value.filter((filter)=>{
    return filter[1];
  }).map((element) => element[0]);
})
const cartDataStore = useCartDataStore();


onMounted(() => {
      const storeId=selectedStore.value?.id ?? NaN;
      const storeIdQuery = isNaN(storeId) ? undefined  : storeId
      getProductsPublicUrl(categoriesSelected.value,pageIndex.value,10,textFilter.value,storeIdQuery).then((response)=>{
      products.value = response.products;
      pageTotal.value=response.totalPages;

    }).catch(()=>{
      console.log("fail to load new items")}).finally(()=>{
        isLoading.value = false;
      });
    }
)
onUnmounted(() =>{
  cartDataStore.$reset();
} )
watch(() => [categoriesSelected.value.length, textFilter.value,pageIndex.value,selectedStore.value?.id], () => {
  const storeId=selectedStore.value?.id ?? NaN;
  const storeIdQuery = isNaN(storeId) ? undefined  : storeId
  getProductsPublicUrl(categoriesSelected.value,pageIndex.value,10,textFilter.value,storeIdQuery).then((response)=>{
      isLoading.value = true;
      products.value = response.products;
      pageTotal.value=response.totalPages;
    }).catch(()=>{
      console.log("fail to load new items")}).finally(()=>{
        isLoading.value = false;
  });
},{deep:true})
</script>
<style>
.slide-fade-enter-active {
  transition: all 1s ease-out;
}

.slide-fade-leave-active {
  transition: all 1s cubic-bezier(1, 1, 1, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100%);
  
}
</style>
<template>
<div class="pb-4">
  <OrderConfirmModal v-if="orderConfirmModal" v-model="orderConfirmModal"/>
  <Transition name="slide-fade">
  <ShopCart v-if="cartListVisible" v-model:cartListVisible="cartListVisible" v-model:submitButtonVisible="orderConfirmModal"/>
  </Transition>
  <ShopHeader v-model:cartListVisible="cartListVisible" v-model:textFilter="textFilter" v-model:selectedStore="selectedStore"/>
  <div class="block sm:hidden ml-[5%] w-[188px] mb-4">
    <ShopSelectorInput v-model:selectedStore="selectedStore"/>
  </div>
  <div class="mb-4">
    <ShopCategoryList v-model="filterCategoryEntries"/>
  </div>
  <ShopProductList :products="products" v-model:pageIndex="pageIndex" v-model:pageTotal="pageTotal" :isLoading="isLoading"/>

</div>

</template>
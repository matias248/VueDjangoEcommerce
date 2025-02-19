<script setup lang="ts">
import type { StoreDTO } from '@/dto/StoreDTO';
import SearchBar from '../SearchBar.vue';
import ShopStoreInputList from './ShopStoreInputList.vue';
import { onMounted, ref, watch, type Ref } from 'vue';
import { getStoresFilteredByNameCityCodeZip } from '@/services/storeService';
import DisplayNotFound from '@/components/shared/DisplayNotFound.vue';
import IconSpinner from '@/components/icons/IconSpinner.vue';
import { vOnClickOutside } from '@vueuse/components'
const selectedStore = defineModel<StoreDTO>();

const temporalStore = ref<StoreDTO>();
const shopSelectorDialog = defineModel<boolean>('shopSelectorDialog');
const textFilter = ref('');
const stores:Ref<StoreDTO[]> =ref([]);
const isLoafing = ref(true);
const errorLoading = ref(false);

onMounted(() => {
    // (categories: string[], pageIndex: number, elementsPerPage: number, textFilter: string, storeId?: number)
      getStoresFilteredByNameCityCodeZip(textFilter.value).then((response)=>{
      stores.value = response;
    }).catch(()=>{
      errorLoading.value=true;
      console.log("fail to load new items")}).finally(()=>{
        isLoafing.value = false;
      });
    }
)
watch(textFilter, (textFilterNew) => {
  isLoafing.value =true;
  getStoresFilteredByNameCityCodeZip(textFilter.value).then((response)=>{
      stores.value = response;
      errorLoading.value=false;
    }).catch(()=>{
      errorLoading.value=true;
      console.log("fail to load new items")}).finally(()=>{
      isLoafing.value = false;
      });
})
onMounted(()=>{
  temporalStore.value = selectedStore.value;
})
const closeDialog =()=>{
  shopSelectorDialog.value = false;
}
</script>
<template>
  <div v-on-click-outside="closeDialog"
  class="fixed h-[100dvh] bg-gray-300 dark:bg-gray-500 top-0 left-0 max-[460px]:w-[50%] w-[40%] md:w-[30%] z-10 rounded-r-lg flex flex-col gap-1 px-1"
  >
  <div class="dark:text-white font-bold self-center">Select your store</div>
  <div class="dark:text-slate-100 text-sm mb-1">
    Enter your zip code or city to see the nearest stores. This will allow you
    to filter products by store.
  </div>
  <div class=" ">
    <SearchBar id="filterstores" text-hover="" v-model="textFilter"/>
  </div>
  <div class="flex-1 overflow-auto mb-2" >
   
    <ShopStoreInputList v-if="isLoafing==false" v-model:selected-store="selectedStore" v-model:temporal-store="temporalStore" :stores="stores"/>
  </div>
  <div class="flex justify-center">
    <IconSpinner v-if="isLoafing"/>
  </div>
  <DisplayNotFound v-if="isLoafing==false && errorLoading"/>

  <div class="mb-2">
    <button :name="'confirmDialogButton-Select store'" @click="()=>{selectedStore = temporalStore; shopSelectorDialog=false }"  :class="'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 dark:text-white '">Select store</button>
  </div>
</div>

</template>
<script setup lang="ts">
import type { StoreDTO } from '@/dto/StoreDTO';
import IconSpinner from '../icons/IconSpinner.vue';
import CreateItemButton from '../shared/CreateItemButton.vue';
import type { ButtonProps } from '@/utils/utilsFunctions';
import { onMounted, ref, type Ref } from 'vue'
import { getStores } from '@/services/storeService';
import StoreItem from './StoreItem.vue';
import { useRouter } from 'vue-router';
import { usePathDataStore } from '@/stores/PathData';


  const router = useRouter()
  const title ="List of stores";
  let isLoading = ref(true);
  let stores:Ref<StoreDTO[]> = ref([]);
  const createNewItemProps: ButtonProps = {
  functionToDo: () => { router.push("stores/new")},
  title: 'Create a store'
  };

  const pathData = usePathDataStore();
  onMounted(() => {
    getStores().then((response)=>{
      stores.value = response;
      pathData.setAll(false,true,undefined,undefined,undefined,undefined);
    }).catch(()=>{console.log("fail to load new items")}).finally(()=>{isLoading.value=false})
})

defineProps<{
}>()
</script>

<template>
<div class="mx-auto max-w-[1600px] mx-auto w-[90%]">
  <div class="text-4xl text-center mb-8 dark:text-white">{{ title }}</div>
  <div v-if="!isLoading && stores"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-y-4 gap-y-6 pb-4 md:justify-items-center"
  >
  <StoreItem v-for="store in stores" :store="store"/>
  </div>
  <CreateItemButton :button-props="createNewItemProps" />
  <div v-if="isLoading" class="flex justify-center"><IconSpinner/></div>
</div>
</template>
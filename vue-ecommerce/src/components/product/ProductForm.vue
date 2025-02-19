<script setup lang="ts">
import type { StoreDTO } from '@/dto/StoreDTO';
import { onMounted, reactive, ref, type Reactive } from 'vue';
import InputOfStringForm from '../shared/InputOfStringForm.vue';
import InputOfNumberForm from '../shared/InputOfNumberForm.vue';
import ValidateButton from '../shared/ValidateButton.vue';
import CancelButton from '../shared/CancelButton.vue';

import {DESCRIPTION_RESTRICTION, descriptionRestrictionMessage, latitudeLongitudeRestrictionMessage, NAME_RESTRICTION, nameRestrictionMessage,onlyNumbersRestrictionMessage,REGEX} from '../../constants';
import DeleteButton from '../shared/DeleteButton.vue';
import InputOfUrlImagesForm from '../shared/InputOfUrlImagesForm.vue';
import { useRoute, useRouter } from 'vue-router';
import { arrayCategoryType, arrayCurrencyType, arrayInventoryStatusType, type ProductDTO } from '@/dto/ProductDTO';
import { createProductById, deleteProductById, getProductByIdWithstore, updateProductById } from '@/services/productService';
import InputOfSwitchForm from '../shared/InputOfSwitchForm.vue';
import { usePathDataStore } from '@/stores/PathData';
import IconSpinner from '../icons/IconSpinner.vue';
import DisplayNotFound from '../shared/DisplayNotFound.vue';

defineProps<{ 
}>()
let isLoading = ref(true);
const router = useRouter();
const route = useRoute();
let errorLoading = ref(false);

let productId: number | undefined=route.params.productId ? +route.params.productId : undefined;
let storeId: number | undefined=route.params.id ? +route.params.id : undefined;
let title: string = productId !== undefined ? "Edit the product" : "Create a new product";
const pathData = usePathDataStore();

let deleteFunction: ()=>void= ()=>{

  if(productId && !isNaN(+productId) && storeId && !isNaN(storeId)){
    deleteProductById(storeId,productId).then((response:ProductDTO)=>{
      router.push(`/stores/${response.storeId}/products`);
    }).catch(()=>{
      console.log("error when deleted")
    })
  }
};

let cancelFunction: ()=>void= ()=>{ router.push(`/stores/${storeId}/products`)};



let product:Reactive<ProductDTO> = reactive({
    id: -1,
    name: '',
    description:'',
    price:0,
    imageUrl:'',
    inventoryStatus:arrayInventoryStatusType[0],
    category:arrayCategoryType[0],
    currency:arrayCurrencyType[0],
    storeId:storeId ?? 0,
})

onMounted(() => {
  if(storeId && productId && !isNaN(storeId) && !isNaN(productId)){
    getProductByIdWithstore(storeId,productId).then((response:{product:ProductDTO,store:StoreDTO})=>{
        Object.assign(product, response.product);
        pathData.setAll(true,true,storeId,productId,response.product.name,response.store.name);
        
    }).catch(()=>{
      console.log('Error when loading product');
      errorLoading.value = true;
    })
  }
  isLoading.value = false;
})

const onSubmit:() => void= ()=>{
    let valid=true;
    if(product.name.length > NAME_RESTRICTION){
        valid=false;
    }
    if(product.description.length > DESCRIPTION_RESTRICTION){
        valid=false;
    }
    if(!arrayCategoryType.includes(product.category)){
        valid=false;
    }
    if(!arrayCurrencyType.includes(product.currency)){
        valid=false;
    }
    if(!arrayInventoryStatusType.includes(product.inventoryStatus)){
        valid=false;
    }
    if(!REGEX.PRICE.test(product.price+'')){
        valid=false;
    }
    if(valid){
      onSubmitAction();
    }
}

const onSubmitAction:()=> void=()=>{
  if ( productId && !isNaN(productId)) {
      updateProductById(+(storeId ?? 0),productId, product).then((data) => {
        router.push(`/stores/${storeId}/products`);
      }).catch((error) => {
        console.error('Error when update');
      })
    }
  else if( storeId){
      createProductById(storeId,product).then((data) => {
        router.push(`/stores/${storeId}/products`);
      }).catch((error) => {
        console.error('Error when create');
      })
    }
}

</script>

<template>

<div v-if="!isLoading && !errorLoading" class="flex items-center flex-col pb-4">
  <div class="mb-6 text-4xl text-center mb-16 dark:text-white">{{ title }}</div>
  <form
    class="mx-auto w-3/4" v-on:submit="onSubmit" @submit.prevent
  >
  <InputOfUrlImagesForm title="URL" :required="false" v-model="product.imageUrl" :number-of-lines="1"  style-override="" :error-should-display="false" />
  <InputOfStringForm title="Name" :error-should-display="product.name.length > NAME_RESTRICTION"  :required="true" v-model="product.name" :number-of-lines="1" :help-text="nameRestrictionMessage"  style-override="" />
  <InputOfStringForm title="Description" :error-should-display="product.description.length > DESCRIPTION_RESTRICTION" :required="true" v-model="product.description" :number-of-lines="4" :help-text="descriptionRestrictionMessage" style-override="" />
  <div class="flex gap-4">
    <InputOfNumberForm title="Price" :error-should-display="!REGEX.PRICE.test(product.price+'')"  :required="true" v-model="product.price" :number-of-lines="1" :help-text="latitudeLongitudeRestrictionMessage" style-override="flex-1" />
    <InputOfSwitchForm :options="arrayCurrencyType" title="Currency" :error-should-display="product.name.length > NAME_RESTRICTION" :required="true" v-model="product.currency" :number-of-lines="1" :help-text="nameRestrictionMessage" style-override=" text-center h-[2.875rem] min-w-[50px] " />
  </div>
  <InputOfSwitchForm :options="arrayCategoryType" title="Category" :error-should-display="false" :required="true" v-model="product.category" :number-of-lines="1" :help-text="onlyNumbersRestrictionMessage" style-override="" />
  <InputOfSwitchForm :options="arrayInventoryStatusType" title="Inventory status" :error-should-display="false" :required="true" v-model="product.inventoryStatus" :number-of-lines="1" :help-text="onlyNumbersRestrictionMessage" style-override="" />
  <div v-if="storeId" class="md:gap-28 mt-4 w-40 min-h-8 mb-8 md:mb-4">
      <DeleteButton title="Delete Product" style-override="" :function-to-do="deleteFunction" />
  </div>
  <div class="grid md:grid-cols-2 md:gap-28 gap-4 mt-4 mx-auto md:w-80 min-h-14 ">
    <ValidateButton title="Submit" style-override="" />
    <CancelButton :functionToDo="cancelFunction" title="Cancel" style-override=""/>
  </div>
  </form>
</div>
<DisplayNotFound v-if="!isLoading && errorLoading" />
<div v-if="isLoading" class="flex justify-center"><IconSpinner/></div>
</template>
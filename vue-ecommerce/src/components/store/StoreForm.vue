<script setup lang="ts">
import type { StoreDTO } from '@/dto/StoreDTO';
import { onMounted, reactive, ref, type Reactive } from 'vue';
import InputOfStringForm from '../shared/InputOfStringForm.vue';
import InputOfNumberForm from '../shared/InputOfNumberForm.vue';
import ValidateButton from '../shared/ValidateButton.vue';
import CancelButton from '../shared/CancelButton.vue';

import {DESCRIPTION_RESTRICTION, latitudeLongitudeRestrictionMessage, NAME_RESTRICTION, nameRestrictionMessage,onlyNumbersRestrictionMessage, REGEX} from '../../constants';
import DeleteButton from '../shared/DeleteButton.vue';
import InputOfUrlImagesForm from '../shared/InputOfUrlImagesForm.vue';
import { createStoreById, deleteStoreById, getStoreById, updateStoreById } from '@/services/storeService';
import { useRoute, useRouter } from 'vue-router';
import { usePathDataStore } from '@/stores/PathData';
import IconSpinner from '../icons/IconSpinner.vue';
import DisplayNotFound from '../shared/DisplayNotFound.vue';

defineProps<{ 
}>()

let isLoading =ref(true);

const router = useRouter();
const route = useRoute();
let errorLoading = ref(false);
let storeId: string | undefined=route.params.id?.toString();
let title: string = storeId !== undefined ? "Edit the store" : "Create a new store";
const pathData = usePathDataStore();

let deleteFunction: ()=>void= ()=>{
  let id = +storeId;
  if(id && !isNaN(+id)){
    deleteStoreById(id).then((response:StoreDTO)=>{
      router.push('/stores');
    }).catch(()=>{
      console.log("error when deleted")
    })
  }
};

let cancelFunction: ()=>void= ()=>{ router.push('/stores')};



let store:Reactive<StoreDTO> = reactive({
    id: -1,
    name: '',
    address: {city:'',state:'',zipCode:'',streetName:'',streetNumber:''},
    location: {latitude:0,longitude:0},
    contactPhone: '',
    imageUrl: '',
})
onMounted(() => {
  let id = +storeId;
  if(id && !isNaN(+id)){
    getStoreById(id).then((response:StoreDTO)=>{
        Object.assign(store, response);
        pathData.setAll(false,true,response.id,undefined,undefined,response.name);
    }).catch(()=>{
        console.log('error loading store');
        errorLoading.value = true;
    })
  }
  isLoading.value = false;
})

const onSubmit:() => void= ()=>{
    let valid=true;
    if(store.name.length > NAME_RESTRICTION){
        valid=false;
    }
    if(store.address.city.length > NAME_RESTRICTION){
        valid=false;
    }
    if(store.address.state.length > NAME_RESTRICTION){
        valid=false;
    }
    if(store.address.streetName.length > NAME_RESTRICTION){
        valid=false;
    }
    if(store.address.zipCode.length > NAME_RESTRICTION){
        valid=false;
    }
    if(!REGEX.ONLYNUMBERS.test(store.address.streetNumber )){
        valid=false;
    }
    if(!REGEX.LATITUDE.test(store.location.latitude+"")){
        valid=false;
    }
    if(!REGEX.LONGITUDE.test(store.location.longitude+"")){
        valid=false;
    }
    if(valid){
      onSubmitAction();
    }
}

const onSubmitAction:()=> void=()=>{
  if (storeId !== "new" && !isNaN(+(storeId ?? NaN))) {
      updateStoreById(+(storeId ?? 0), store).then((data) => {
        router.push('/stores');
      }).catch((error) => {
        console.error('Error when update');
      })
    }
    else {
      createStoreById(store).then((data) => {
        router.push('/stores');
      }).catch((error) => {
        console.error('Error when create');
      })
    }
}

</script>

<template>

<div  v-if="!isLoading && !errorLoading" class="flex items-center flex-col pb-4">
  <div class="mb-6 text-4xl text-center mb-16 dark:text-white">{{ title }}</div>
  <form
    class="mx-auto w-3/4" v-on:submit="onSubmit" @submit.prevent
  >
  <InputOfUrlImagesForm title="URL" :required="false" v-model="store.imageUrl" :number-of-lines="1"  style-override="" :error-should-display="false" />
  <div class="flex gap-4">
      <InputOfStringForm title="Name" :error-should-display="store.name.length > NAME_RESTRICTION"  :required="true" v-model="store.name" :number-of-lines="1" :help-text="nameRestrictionMessage"  style-override="" />
      <InputOfStringForm title="City" :error-should-display="store.name.length > NAME_RESTRICTION" :required="true" v-model="store.address.city" :number-of-lines="1" :help-text="nameRestrictionMessage" style-override="" />
  </div>
  <InputOfStringForm title="State" :error-should-display="store.name.length > NAME_RESTRICTION" :required="true" v-model="store.address.state" :number-of-lines="1" :help-text="nameRestrictionMessage" style-override="" />
  <div class="flex gap-4">
    <InputOfStringForm title="Zipcode" :error-should-display="store.name.length > NAME_RESTRICTION" :required="true" v-model="store.address.zipCode" :number-of-lines="1" :help-text="nameRestrictionMessage" style-override="" />
    <InputOfStringForm title="Street Number" :error-should-display="!REGEX.ONLYNUMBERS.test(store.address.streetNumber)" :required="true" v-model="store.address.streetNumber" :number-of-lines="1" :help-text="onlyNumbersRestrictionMessage" style-override="" />
  </div>
  <InputOfStringForm title="Street Name" :error-should-display="store.name.length > DESCRIPTION_RESTRICTION" :required="true" v-model="store.address.streetName" :number-of-lines="1" :help-text="nameRestrictionMessage" style-override="" />
  <div class="flex gap-4">
    <InputOfNumberForm title="Latitude" :error-should-display="!REGEX.LATITUDE.test(store.location.latitude+'')" :required="true" v-model="store.location.latitude" :number-of-lines="1" :help-text="latitudeLongitudeRestrictionMessage" style-override="" />
    <InputOfNumberForm title="Longitude" :error-should-display="!REGEX.LONGITUDE.test(store.location.longitude+'')" :required="true" v-model="store.location.longitude" :number-of-lines="1" :help-text="latitudeLongitudeRestrictionMessage" style-override="" />
  </div>
  <div v-if="storeId" class="md:gap-28 mt-4 w-40 min-h-8 mb-8 md:mb-4">
      <DeleteButton title="Delete Store" style-override="" :function-to-do="deleteFunction" />
  </div>
  <div class="grid md:grid-cols-2 md:gap-28 gap-4 mt-4 mx-auto md:w-80 min-h-14 ">
            <ValidateButton title="Submit" style-override="" />
            <CancelButton :functionToDo="cancelFunction" title="Cancel" style-override=""/>
  </div>
  </form>
</div>
<DisplayNotFound v-if="!isLoading && errorLoading"/>
<div v-if="isLoading" class="flex justify-center"><IconSpinner/></div>
</template>
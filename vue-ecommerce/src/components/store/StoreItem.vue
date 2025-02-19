<script setup lang="ts">
import type { StoreDTO } from '@/dto/StoreDTO';
import IconNoImageSet from '../icons/IconNoImageSet.vue';
import EditButton from '../shared/EditButton.vue';
import IconSpinner from '../icons/IconSpinner.vue';
import DisplayNotFound from '../shared/DisplayNotFound.vue';

defineProps<{ store:StoreDTO
}>()

</script>

<template>

<router-link :to="`/stores/${store.id}`">
<div
   v-if="store !== undefined"
  v-bind:id="`storeElementGallery${store.id}`"
  class="h-56 w-128 md:w-56 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative"
>
  <EditButton :id="store.id" :style-override="'absolute top-0 right-0'" :url-to-go="`/stores/${store.id}/edit`"/>
  <div v-bind:id="`imageStoreGallery${store.id}`" class="w-28 mt-5 mx-auto h-16">
  
    <div
      v-if="!store.imageUrl"
      v-bind:id="`divNoImageSet${store.id}`"
      class="h-16 max-w-full rounded-lg"
    >
      <IconNoImageSet/>
    </div>
    <img
      v-if="store.imageUrl"
      class="h-16 max-w-full rounded-lg object-cover mx-auto text-center dark:text-white"
      :src="store.imageUrl"
      alt="error loading image"
    />
  </div>
  <div
     v-bind:id="`textStoreGallery${store.id}`"
    class="mt-8 max-w-full h-24 mx-1 text-center"
  >
    <p
      v-bind:id="`1textStoreGallery${store.id}`"
      class="h-1/3 w-full text-xl font-bold text-gray-900 dark:text-white truncate leading-7"
    >
      {{ store.name }}
    </p>
    <p
      v-bind:id="`2textStoreGallery${store.id}`"
      class="h-1/3 w-full text-sm text-gray-900 dark:text-white truncate leading-5"
    >
      {{ store.address.city }}
    </p>
    <div class="h-1/3 flex flex-row-reverse items-center overflow-hidden">
      <router-link :to="`/stores/${store.id}/products`">
      <button
        v-bind:id="`listOfProductsButton${store.id}`"
        class="max-h-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-2 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        List of Products
      </button>
      </router-link>
    </div>
  </div>
</div>
</router-link>

</template>
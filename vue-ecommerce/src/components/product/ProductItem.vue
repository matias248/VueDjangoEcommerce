<script setup lang="ts">
import type { ProductDTO } from '@/dto/ProductDTO';
import IconNoImageSet from '../icons/IconNoImageSet.vue';
import EditButton from '../shared/EditButton.vue';

defineProps<{ product:ProductDTO
}>()

</script>

<template>
    <router-link :to="`/stores/${product.storeId}/products/${product.id}`">
        <div :id="'productElementGallery' + product.id" class="h-56 w-128 md:w-56 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative" >
                <EditButton :id="product.id" :style-override="'absolute top-0 right-0'" :url-to-go="`/stores/${product.storeId}/products/${product.id}/edit`"/>
                <div :id="'imageProductGallery' + product.id" class="w-28 mt-5 mx-auto  h-16 ">
                    <img
                        v-if="product.imageUrl"
                        class="h-16 max-w-full rounded-lg object-cover mx-auto text-center dark:text-white"
                        :src="product.imageUrl"
                        alt="error loading image"
                        />
                    <div v-if="!product.imageUrl" v-bind:id="'divNoImageSet'+product.id" class="h-16 max-w-full rounded-lg">
                    <IconNoImageSet/>
                    </div>
                </div>
                <div :id="'textProductGallery'+product.id" class="mt-8 max-w-full h-24 mx-1 text-center">
                    <p :id="'1textProductGallery'+product.id" class="h-1/2 w-full text-xl font-bold text-gray-900 dark:text-white overflow-hidden text-ellipsis leading-6 ">
                        {{product.name}}
                    </p>
                    <p :id="'2textProductGallery'+product.id" class=" w-full text-sm text-gray-700 dark:text-gray-400 leading-6 line-clamp-2">
                        {{product.description}}
                    </p>
                </div>
        </div>
    </router-link>
</template>
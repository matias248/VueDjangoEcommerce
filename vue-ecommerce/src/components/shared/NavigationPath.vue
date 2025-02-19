<script setup lang="ts">
import { AppNames } from '@/constants';
import { usePathDataStore } from '@/stores/PathData';
import { getCurrentApp } from '@/utils/utilsFunctions';
import { onMounted, onUpdated, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

defineProps<{
}>()
const router = useRouter();
const route = useRoute();
const pathData = usePathDataStore();

</script>

<template>
    <div v-if="getCurrentApp(route.path) == AppNames.FORMS" class="pl-2 text-xs sm:text-base text-gray-900 dark:text-white flex w-full gap-1 max-w-[100vh]">
        <div v-if="pathData.inStores && pathData.storeName" id="NavStoresTitle" class="overflow-hidden max-w-[60px]  hover:opacity-75" 
        v-on:click="router.push('/stores')">
            Stores 
        </div>

        <template v-if="pathData.storeName">
            <div>{{">"}}</div>
            <div id="NavStoreName" class="truncate max-w-[80px]  sm:max-w-[200px] overflow-hidden text-ellipsis hover:opacity-75" 
            v-on:click="() => { if (pathData.storeId){ router.push(`/stores/${pathData.storeId}`)} }">
                {{pathData.storeName}}
            </div>
        </template>
        <template v-if="pathData.inProducts && pathData.storeId" >
            <div>{{">"}}</div>
            <div id="NavProductsTitle" class="overflow-hidden max-w-[80px]  sm:max-w-[200px] text-ellipsis  hover:opacity-75" 
            v-on:click="() => { if (pathData.storeId){
                router.push(`/stores/${pathData.storeId}/products`)
            } }">
                Products
            </div>
        </template>
        <template v-if="pathData.productName">
            <div>{{">"}}</div>
            <div class="truncate overflow-hidden max-w-[80px] sm:max-w-[200px] text-ellipsis hover:opacity-75" id="NavProductName" 
            v-on:click="() => { 
                if (pathData.storeId && pathData.productId) router.push(`/stores/${pathData.storeId}/products/${pathData.productId}`) 
                }">
                {{pathData.productName}}
            </div>
        </template>          
    </div>
</template>
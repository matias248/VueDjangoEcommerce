<script setup lang="ts">
import { useRoute } from 'vue-router';
import IconEc from './icons/IconEc.vue';
import IconForms from './icons/IconForms.vue';
import IconShop from './icons/IconShop.vue';
import { computed, ref, watch } from 'vue';
import { getCurrentApp } from '@/utils/utilsFunctions';
import { AppNames } from '@/constants';
const route = useRoute();

const currentAppName = computed(() => {
  return getCurrentApp(route.path);
})
</script>
<template>
  <header class="h-[64px] mb-8">
  <nav class="bg-slate-100 border-gray-200 py-[10px] dark:bg-gray-800 h-full">
    <div
      class="flex flex-wrap justify-between items-center mx-auto max-w-full px-2"
    >
      <div class="flex items-center gap-1">
        <div class="size-12"><IconEc/></div>
        <span
          class="self-center text-xl font-semibold whitespace-nowrap dark:text-white hidden sm:inline"
          >ECportfolio   
          </span
        >
      </div>
      <div class="flex items-center lg:order-2">
        <router-link v-if="currentAppName == undefined || currentAppName != AppNames.FORMS" to="/stores">
        <button
          id="NavigationFormsApp"
          class="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none flex gap-1"
        >
          <div class="size-6"><IconForms/></div>
          <div class="hidden min-[320px]:inline">Forms</div>
        </button>
        </router-link >
        <router-link v-if="currentAppName == undefined || currentAppName != AppNames.SHOP" to="/shop">
        <button
          id="NavigationShopApp"
          class="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none flex gap-1"
        >
          <div class="size-6"><IconShop/></div>
          <div class="hidden min-[320px]:inline">Shop</div>
        </button>
        </router-link>
      </div>
    </div>
  </nav>
</header>

</template>
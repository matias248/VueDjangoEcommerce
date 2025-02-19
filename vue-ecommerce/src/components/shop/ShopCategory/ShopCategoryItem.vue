<script setup lang="ts">
import IconCross from '@/components/icons/IconCross.vue';
import IconVerif from '@/components/icons/IconVerif.vue';
defineProps<{category?:string,filterOn:boolean,id:number
}>();
const filterOn = defineModel('filterOn')
</script>
<template>
<div v-if="category!=undefined &&  id!=undefined" @click="()=>filterOn = !filterOn"
  :id="'ShopCategoryItem' + id "
  v-bind:class="
    'dark:text-white rounded-lg px-2 flex ' +
      (filterOn ? 'bg-blue-500' : 'bg-gray-500')
  "
>
  <div v-if="!filterOn" class="dark:fill-white size-[20px] self-center"><IconCross/></div>
  <div v-if="filterOn" class="dark:fill-white size-[20px] self-center"><IconVerif/></div>
  <div>{{ category }}</div>
</div>
</template>
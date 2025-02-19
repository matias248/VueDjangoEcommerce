<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import ShopCategoryItem from './ShopCategoryItem.vue';
import { getInitialCategoryMap } from '@/utils/utilsFunctions';
const title = "Our Categories";
const filterCategoryEntries = defineModel<[string,boolean][]>();

onMounted(() => {
    let filterCategoryMap: Map<string, boolean> = getInitialCategoryMap();
    if(filterCategoryEntries)
    filterCategoryEntries.value = filterCategoryMap ? Array.from(filterCategoryMap.entries()) : [];
})
</script>
<template v-if="filterCategoryEntries">
    <div id="categoryListContainer" class="max-w-[1200px] mx-auto w-[90%] rounded-lg">
    <div id="categoryListTitle" class="dark:text-white text-lg">{{title}}</div>
    <div id="categoryList" class="flex gap-1 flex-wrap">
            <ShopCategoryItem v-for="(filter,index) in filterCategoryEntries " v-model:filterOn="filter[1]" :id="index" :category="filter[0]"/>
    </div>
</div>

</template>
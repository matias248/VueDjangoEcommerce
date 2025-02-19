<script setup lang="ts">


defineProps<{
}>()

const IntroPlatform = 'Welcome to ECportfolio, a platform designed to simulate a simple e-commerce.' 
const IntroDiffApp ='ECportfolio integrates two applications:';
const AppFormsName = "AppForms";
const presentationAppForms = "Easily create and manage data with intuitive forms. FormsApp ensures you can build a comprehensive database effortlessly.";
const AppShopName = "AppShop";
const presentationAppShop = "Simulate a shop website. Present products with detailed descriptions and Images, allowing visitors to browse as if they were shopping online.";

</script>

<template>
 <div class="flex mx-3 items-center flex-col">
    <div class="mb-8 text-xl  dark:text-white" > {{IntroPlatform}}</div>
    <div class="mb-6 dark:text-white self-start text-xl">
        <div>{{IntroDiffApp}}</div>
    </div>
    <div class="mb-6 dark:text-white self-start text-base">
        <div class="font-bold">{{AppFormsName + ':'}}</div>
        <div>{{presentationAppForms}}</div>
    </div>
    <div class="mb-6 dark:text-white self-start text-base">
        <div class="font-bold">{{AppShopName + ':'}}</div>
        <div>{{presentationAppShop}}</div>
    </div>
</div>
</template>
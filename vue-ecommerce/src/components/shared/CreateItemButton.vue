<script setup lang="ts">
import type { ButtonProps } from '@/utils/utilsFunctions';



defineProps<{
    buttonProps: ButtonProps;
}>()
</script>

<template>
<button v-on:click="buttonProps.functionToDo" id="fixedButton" class='fixed bottom-4 right-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-2.5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
    <svg class=" h-[20px] me-2" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
    <span> {{buttonProps.title}}</span>
</button>

</template>
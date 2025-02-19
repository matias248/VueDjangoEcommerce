<script setup lang="ts">



defineProps<{styleOverride:string,functionToDo:()=>void,title:string
}>()
</script>

<template>
<button type="button" name="deleteButton"  v-on:click="functionToDo()"
v-bind:class="'text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-800 dark:hover:bg-red-900 dark:focus:ring-blue-800 '+ (styleOverride ?? '')">{{title}}</button>
</template>
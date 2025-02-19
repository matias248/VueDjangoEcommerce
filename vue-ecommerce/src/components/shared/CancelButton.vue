<script setup lang="ts">



defineProps<{styleOverride:string,functionToDo:()=>void,title:string
}>()
</script>

<template>
 <button type="button" name="cancelButton" v-on:click="functionToDo()"
 v-bind:class="'text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800'
   + (styleOverride ?? '') ">
 {{title}}</button>

</template>
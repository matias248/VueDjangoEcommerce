<script setup lang="ts">



defineProps<{styleOverride:string,title:string
}>()
</script>

<template>
 <button name="submitButton" 
 type="submit" v-bind:class="'text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ' + (styleOverride ?? '')">{{title}}</button>

</template>
<script setup lang="ts">
import IconEdit from '../icons/IconEdit.vue';



defineProps<{id:number,styleOverride:string,urlToGo:string
}>()
</script>

<template>
<router-link :to="urlToGo">
<button
  v-bind:id="`editButton${ (id ?? '')}`"
  v-bind:class="`w-14 bg-gray-600 rounded-lg dark:fill-white ` + styleOverride"
>
  <IconEdit/>
</button>
</router-link >
</template>
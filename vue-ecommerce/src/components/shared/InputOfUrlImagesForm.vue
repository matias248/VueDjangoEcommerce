<script setup lang="ts">
import IconNoImageSet from '../icons/IconNoImageSet.vue';




defineProps<{
    title:string,required:boolean,styleOverride:string | undefined,errorShouldDisplay:boolean,
}>()
const model = defineModel<string>();
</script>

<template>
<div class="mb-5">
      <div class="w-24 h-24 mb-2 bg-white border border-slate-400 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto sm:mx-0">
            <img v-if="modelValue!=''" class="mt-5 h-16 max-w-full rounded-lg object-cover mx-auto text-center dark:text-white" :src="modelValue" alt="error loading image">
            </img>
            <IconNoImageSet v-if="modelValue==''" />  
      </div>
        <label v-bind:for="'inputImageUrl-'+ title" class="block mb-2 text-lg font-medium dark:text-white flex items-center">
            {{title + (required ? "*" : "")}}
        </label>
        <textarea v-model="model" v-bind:id="'inputImageUrl-' + title" :rows="1" v-bind:class="'bg-gray-50 border border-slate-400 text-gray-900 text-base rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ' + (errorShouldDisplay ? 'bg-red-200' : '') + ' ' + (styleOverride ?? '')" :required="required" ></textarea>
    </div>
</template>
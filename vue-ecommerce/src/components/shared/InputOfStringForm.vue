<script setup lang="ts">
import { onUpdated } from 'vue';
import {NAME_RESTRICTION} from '../../constants'
import {DESCRIPTION_RESTRICTION} from '../../constants'


const props = defineProps<{
    title:string,required:boolean,numberOfLines:number,styleOverride:string | undefined,helpText:string,errorShouldDisplay:boolean
}>()

const model = defineModel<string>();


</script>

<template>
<div class="mb-5 w-full min-w-[100px]">
  <label
    v-bind:for="'inputString-' + title"
    class="block mb-2 text-base sm:text-lg font-medium dark:text-white flex items-center"
  >
    {{ title + (required ? "*" : "") }}
  </label>
  <textarea
    v-bind:id="'inputString-' + title"
    :required="required"
    v-model="model"
    :rows="numberOfLines"
    v-bind:class="
      'block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-slate-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ' +
        ((errorShouldDisplay)
          ? 'bg-red-200 dark:bg-red-800 '
          : '') +
        (numberOfLines === 1 ? 'h-[2.875rem]' : '') +
        ' ' +
        (styleOverride ?? '')
    "
  ></textarea>

  <div v-if="errorShouldDisplay" class="text-xs dark:text-white italic overflow-hidden">
    {{ helpText }}
  </div>
  
</div>


</template>
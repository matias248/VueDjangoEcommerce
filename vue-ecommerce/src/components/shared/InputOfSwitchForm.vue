<script setup lang="ts">



defineProps<{
    title:string,styleOverride:string | undefined,options:string[]
}>()
const value = defineModel()
</script>

<template>
  <div class="mb-5">
            <label class="block mb-2 text-base sm:text-lg font-medium dark:text-white">
                {{title}}
            </label>
            <select v-bind:name="title+'selectedOption'"  v-model="value" v-bind:class=" 'block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-slate-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white '  + (styleOverride ?? '')">
              <option v-for="option in options" :value="option" :key="1">
             {{ option }}
          </option>
            </select>
  </div>
</template>
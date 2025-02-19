<script setup lang="ts">


const props = defineProps<{
    title:string,required:boolean,numberOfLines:number,styleOverride:string | undefined,helpText:string,errorShouldDisplay:boolean
}>()
const model = defineModel<number>();
const onChange =(v:Event) => {
      const vtarget = v.target as HTMLInputElement
      const newValueString = vtarget.value.replace(/[^0-9.]/g, "");
      const newValue = +newValueString;
      vtarget.value = newValueString;
      model.value = newValue
}
</script>

<template>
<div class="mb-5 w-full min-w-[100px]">
  <label
    v-bind:for="'inputNumber-' + title"
    class="block mb-2 text-base sm:text-lg font-medium dark:text-white flex items-center"
  >
    {{ title + (required ? "*" : "") }}
  </label>
  <input
    type="text"
    v-bind:id="'inputNumber-' + title"
    :value="model"
    @input="onChange"
    v-bind:class="'bg-gray-50  border border-slate-400 text-gray-900 text-base rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ' +
        ( errorShouldDisplay 
          ? 'bg-red-200 dark:bg-red-800'
          : '')"
    :required="required"
  />
  
  <div v-if="errorShouldDisplay" class="text-xs dark:text-white italic overflow-hidden">
    {{ helpText }}
  </div>
  
</div>



</template>
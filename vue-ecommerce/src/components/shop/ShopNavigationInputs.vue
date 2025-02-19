<script setup lang="ts">

const model = defineModel<number>();
const totalPages = defineModel<number>('totalPages');

const onChange =(v:Event) => {
      const vtarget = v.target as HTMLInputElement
      const newValueString = vtarget.value.replace(/[^0-9]/g, "");
      const newValue = +newValueString;
      vtarget.value = newValueString;
      if(model.value != newValue){
        model.value = newValue;
      }
}
</script>
<template>
    <div class="flex gap-[6px] mb-2">
  <button
    class="w-[20px] bg-gray-600 rounded-md dark:text-white p-[4px]"
  >
    &#60;
  </button>
  <div
    class="flex gap-[2px] max-w-[200px] h-[35px] overflow-auto items-center px-[2px]"
  >
    <input
      class="max-w-[50px] rounded-md text-center dark:text-white dark:bg-gray-400 h-[25px]"
      :value="model"
      @input="onChange"
    />
    <div class="rounded-md dark:text-white h-[25px] whitespace-nowrap">
      {{ "of " + (totalPages === 0 ? 1 : totalPages) }}
    </div>
  </div>
  <button
    class="w-[20px] bg-gray-600 rounded-md dark:text-white p-[4px]"
  >
    &#62;
  </button>
</div>

</template>
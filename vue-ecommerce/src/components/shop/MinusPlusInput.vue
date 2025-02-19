<script setup lang="ts">
const props = defineProps<{id:string,quantityInCart:number,
}>()
const emit = defineEmits<{
  (e: 'change', id: number): void
}>()

const minusFunction = () => {
    if (props.quantityInCart >= 1) {
       emit('change',props.quantityInCart-1)
    }
  };

const plusFunction = () => {
  if (props.quantityInCart < 99) {
    emit('change',props.quantityInCart+1)

    }
  };
const onChange =(v:Event) => {
      const vtarget = v.target as HTMLInputElement
      const newValueString = vtarget.value.replace(/[^0-9]/g, "").slice(0,2);
      const newValue = +newValueString;
      vtarget.value = newValueString;
      if(props.quantityInCart != newValue){
        emit('change',newValue)

      }
}
</script>
<template>
<button
  :id="id + '-'"
  @click="minusFunction"
  class="bg-red-500 text-white px-4 py-2 rounded-l hover:bg-red-600"
>
  -
</button>
<input
  :id="id + 'input'"
  class="mx-2 border text-center w-16 h-10"
  :value="quantityInCart"
  @input="onChange"
/>
  
<button
  :id="id + '+' "
  @click="plusFunction"
  class="bg-green-500 text-white px-4 py-2 rounded-r hover:bg-green-600"
>
  +
</button>

</template>
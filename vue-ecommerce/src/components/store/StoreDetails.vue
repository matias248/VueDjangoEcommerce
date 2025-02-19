<script setup lang="ts">
import { type StoreDTO } from '@/dto/StoreDTO';
import { getStoreById } from '@/services/storeService';
import { onMounted, reactive, ref, type Reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import IconSpinner from '../icons/IconSpinner.vue';
import DisplayNotFound from '../shared/DisplayNotFound.vue';
import { usePathDataStore } from '@/stores/PathData';
import { formatString } from '../../utils/utilsFunctions';

defineProps<{ 
}>()
 let title = "Details of the store";
 let isLoading =ref(true);

 let store:Reactive<StoreDTO> = reactive({
    id: NaN,
    name: '',
    address: {city:'',state:'',zipCode:'',streetName:'',streetNumber:''},
    location: {latitude:0,longitude:0},
    contactPhone: '',
    imageUrl: '',
})
 const router = useRouter();
 const route = useRoute();
 let storeId: string | undefined=route.params.id?.toString();
 const pathData = usePathDataStore();

 
onMounted(() => {
  let id = +storeId;
  if(id && !isNaN(+id)){
    getStoreById(id).then((response:StoreDTO)=>{
        Object.assign(store, response);
        pathData.setAll(false,true,response.id,undefined,undefined,response.name);

    }).catch(()=>{
        console.log('error loading store');
    })
  }
  isLoading.value = false;
})
</script>

<template>
 <div v-if="!isLoading && !isNaN(store.id)">
        <div class="mb-6 text-4xl text-center mb-16 dark:text-white" >{{title}}</div>

        <div class="max-w-[1000px] mx-auto w-[90%] rounded-lg">
            <div class="text-3xl text-center mb-1 dark:text-white flex justify-end" >
                <button v-on:click="router.push('/stores/'+(storeId ?? '')+'/edit' )"
                    id='gotoEditButton' class="max-h-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-2 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">Go to Edit</button>
            </div>

            <ul class="space-y-2 bg-slate-100 border-gray-200 dark:bg-gray-800  dark:text-white rounded-lg">
                <template v-for="(value, key,index) in store">
                    <li v-if="!['address','location','id','contactPhone'].includes(key)" class="flex justify-between border rounded-lg shadow bg-slate-400 dark:bg-gray-500 dark:border-gray-700 gap-2 margin-top-2">
                        <div
                        :id="'displayStoreElement' + index + 'key'"
                        class="bg-slate-300 dark:bg-gray-600 rounded-l-lg px-1 w-1/2 overflow-y-auto"
                        >
                        {{ formatString(key) }}
                        </div>
                        <div
                        :id="'displayStoreElement' + index + 'value'"
                        class="bg-slate-300 dark:bg-gray-600 rounded-r-lg px-1 w-1/2 overflow-y-auto text-start"
                        >
                        {{ value }}
                        </div>
                    </li>
                    <li v-for="(valueAttr, key2,index2) in value" v-if="['address','location'].includes(key)" class="flex justify-between border rounded-lg shadow bg-slate-400 dark:bg-gray-500 dark:border-gray-700 gap-2 margin-top-2">
                        <div 
                            :id="'displayStoreElement' + index + '-' + index2 + 'key'"
                            class="bg-slate-300 dark:bg-gray-600 rounded-l-lg px-1 w-1/2 overflow-y-auto"
                            >
                            {{formatString(key2)}}
                        </div>
                        <div
                            :id="'displayStoreElement' + index + '-' + index2 + 'value'"
                            class="bg-slate-300 dark:bg-gray-600 rounded-r-lg px-1 w-1/2 overflow-y-auto text-start"
                            >
                            {{ valueAttr }}
                        </div>
                    </li>
                </template> 
            </ul>
        </div>
    </div >
    <DisplayNotFound v-if="!isLoading && isNaN(store.id)"/>
    <div v-if="isLoading" class="flex justify-center"><IconSpinner/></div>
</template>

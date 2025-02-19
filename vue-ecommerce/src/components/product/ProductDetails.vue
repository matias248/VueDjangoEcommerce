<script setup lang="ts">
import { onMounted, reactive, ref, type Reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import IconSpinner from '../icons/IconSpinner.vue';
import DisplayNotFound from '../shared/DisplayNotFound.vue';
import type { ProductDTO } from '@/dto/ProductDTO';
import { getProductByIdWithstore } from '@/services/productService';
import { usePathDataStore } from '@/stores/PathData';
import type { StoreDTO } from '@/dto/StoreDTO';
import { formatString } from '../../utils/utilsFunctions';


defineProps<{ 
}>()
 let title = "Details of the product";
 let isLoading = ref(true);

 let product:Reactive<ProductDTO> = reactive({
    id: NaN,
    name: '',
    description:'',
    price:-1,
    imageUrl:'',
    inventoryStatus:'',
    category:'',
    currency:'',
    storeId:-1,
})
 const router = useRouter();
 const route = useRoute();
 let storeId: string | undefined=route.params.id?.toString();
 let productId: string | undefined=route.params.productId?.toString();
 const pathData = usePathDataStore();

onMounted(() => {
  let id = +storeId;
  let productIdN =+productId;
  if(id && !isNaN(+id)){
    getProductByIdWithstore(id,productIdN).then((response:{product:ProductDTO,store:StoreDTO})=>{
        Object.assign(product, response.product);
        pathData.setAll(true,true,id,productIdN,response.product.name,response.store.name);
    }).catch(()=>{
        console.log('error loading product');
    })
  }
  isLoading.value = false;
})
</script>

<template>
 <div v-if="!isLoading && !isNaN(product.id)">
        <div class="mb-6 text-4xl text-center mb-16 dark:text-white" >{{title}}</div>
        <div class="max-w-[1000px] mx-auto w-[90%] rounded-lg">
            <div class="text-3xl text-center mb-1 dark:text-white flex justify-end" >
                <button v-on:click="router.push('/stores/'+(storeId ?? '')+'/products/'+(productId ?? '')+'/edit' )"
                    id='gotoEditButton' class="max-h-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-2 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">Go to Edit</button>
            </div>
            <ul class="space-y-2 bg-slate-100 border-gray-200 dark:bg-gray-800  dark:text-white rounded-lg">
                <template v-for="(value, key,index) in product">
                    <li v-if="'id'!=key && 'storeId'!=key" class="flex justify-between border rounded-lg shadow bg-slate-400 dark:bg-gray-500 dark:border-gray-700 gap-2 margin-top-2">
                        <div
                        :id="'displayProductElement' + index + 'key'"
                        class="bg-slate-300 dark:bg-gray-600 rounded-l-lg px-1 w-1/2 overflow-y-auto"
                        >
                        {{ formatString(key) }}
                        </div>
                        <div
                        :id="'displayProductElement' + index + 'value'"
                        class="bg-slate-300 dark:bg-gray-600 rounded-r-lg px-1 w-1/2 overflow-y-auto text-start"
                        >
                        {{ value }}
                        </div>
                    </li>
                </template> 
            </ul>
        </div>
    </div >
    <DisplayNotFound v-if="!isLoading && isNaN(product.id)"/>
    <div v-if="isLoading" class="flex justify-center"><IconSpinner/></div>
</template>

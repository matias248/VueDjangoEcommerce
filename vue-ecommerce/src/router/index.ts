import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import Store from '@/components/store/Store.vue'
import StoreForm from '@/components/store/StoreForm.vue'
import StoreDetails from '@/components/store/StoreDetails.vue'
import Product from '@/components/product/Product.vue'
import ProductDetails from '@/components/product/ProductDetails.vue'
import ProductForm from '@/components/product/ProductForm.vue'
import Shop from '@/components/shop/Shop.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomePage
    },
    {
      path: '/stores',
      component: Store
    },
    {
      path: '/stores/:id/edit',
      component: StoreForm
    },
    {
      path: '/stores/new',
      component: StoreForm
    },
    {
      path: '/stores/:id',
      component: StoreDetails
    },
    {
      path: '/stores/:id/products',
      component: Product
    },
    {
      path: '/stores/:id/products/:productId',
      component: ProductDetails
    },
    {
      path: '/stores/:id/products/:productId/edit',
      component: ProductForm
    },
    {
      path: '/stores/:id/products/new',
      component: ProductForm
    },
    {
      path: '/shop',
      component: Shop
    },
  ]
})

export default router
/*
 {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
*/
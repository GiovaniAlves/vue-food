import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Cart from '../views/Cart.vue'
import Products from '../views/Products.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'

Vue.use(VueRouter)

const routes = [
   {
      path: '/',
      component: () => import('@/layouts/WebSite'),
      children: [
         {
            path: '/',
            name: 'home',
            component: Home
         },
         {
            path: '/carrinho',
            name: 'cart',
            component: Cart
         },
         {
            path: '/loja/:companyUrl',
            name: 'products',
            component: Products
         }
      ]
   },
   {
      path: '/',
      component: () => import('@/layouts/Auth'),
      children: [
         {
            path: '/login',
            name: 'login',
            component: Login
         },
         {
            path: '/registro',
            name: 'register',
            component: Register
         }
      ]
   }
]

const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes
})

export default router

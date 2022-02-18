import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Cart from '../views/Cart.vue'
import Products from '../views/Products.vue'
import MyOrders from '../views/auth/MyOrders.vue'
import Login from '../views/auth/Login.vue'
import OrderDetail from '../views/OrderDetail.vue'
import Register from '../views/auth/Register.vue'
import Page404 from '../views/Page404.vue'

Vue.use(VueRouter)

const routes = [
   {
      path: '/',
      component: () => import('@/layouts/WebSite'),
      children: [
         {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
               title: 'Home'
            }
         },
         {
            path: '/carrinho',
            name: 'cart',
            component: Cart,
            meta: {
               title: 'Carrinho de Compras'
            }
         },
         {
            path: '/loja/:companyUrl',
            name: 'products',
            component: Products,
            meta: {
               title: 'Loja'
            }
         },
         {
            path: '/meus-pedidos',
            name: 'myOrders',
            component: MyOrders,
            meta: {
               title: 'Meus Pedidos'
            }
         },
         {
            path: '/pedido/:identify',
            name: 'orderDetail',
            component: OrderDetail,
            props: true,
            meta: {
               title: 'Detalhes do Pedido'
            }
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
            component: Login,
            meta: {
               title: 'Login - VueFood'
            }
         },
         {
            path: '/registro',
            name: 'register',
            component: Register,
            meta: {
               title: 'Registro - VueFood'
            }
         }
      ]
   },
   {
      path: '*',
      component: Page404,
      meta: {
         title: 'Página não Encontrada'
      }
   }
]

const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes
})

router.beforeEach((to, from, next) => {
   document.title = 'VueFood'

   // eslint-disable-next-line no-prototype-builtins
   if (to.hasOwnProperty('meta')) {
      document.title = to.meta.title
   }
   next()
})

export default router

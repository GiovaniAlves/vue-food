<template>
   <div class="cart">
      <!-- cart -->
      <div class="card shopping-cart my-4 ">
         <div class="card-header text-light">
            <i class="fa fa-shopping-cart mr-2" aria-hidden="true"></i>
            Carrinho de Compras
            <router-link :to="{ name: 'home' }" class="btn bnt-sm btn-comprando">
               Continuar Comprando
            </router-link>
            <div class="clearfix"></div>
         </div>
         <div class="card-body">
            <!-- PRODUCT -->
            <div
               v-for="(item, index) in products" :key="index"
               class="row align-items-center py-2"
            >
               <div class="col-4 text-center">
                  <div class="img-circle">
                     <img class="img-responsive" :src="item.product.image" alt="prewiew" width="120" height="80">
                  </div>
               </div>
               <div class="col-8 text-left">
                  <h4 class="product-name"><strong>{{ item.product.title }}</strong></h4>
                  <h5 class="h6">{{ item.product.description }}</h5>
                  <div class="d-flex py-4 justify-content-between align-items-center">
                     <div class="col-10 d-flex align-items-center p-0 ">
                        <h6><strong>R$ {{ item.product.price }} <span class="text-muted">x</span></strong></h6>
                        <div class="quantity ml-4">
                           <input
                              @click="incrementQty(item.product)"
                              type="button"
                              value="+"
                              class="plus">
                           <input type="number" step="1" max="99" min="1" :value="item.qty" title="Qty" class="qty"
                                  size="4">
                           <input
                              @click="decrementQty(item.product)"
                              type="button"
                              value="-"
                              class="minus">
                        </div>
                     </div>
                     <div class="col-2 col-sm-2 col-md-2 text-right">
                        <button
                           @click.prevent="removeProductCart(item.product)"
                           type="button"
                           class="btn btn-outline-danger btn-xs">
                           <i class="fa fa-trash" aria-hidden="true"></i>
                        </button>
                     </div>
                  </div>
               </div>
               <hr>
            </div>
            <!-- END PRODUCT -->

            <hr>
            <Checkout/>
         </div>
         <!-- end card body -->
      </div>
      <!-- cart-->
   </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Checkout from '@/views/_partials/Checkout'

export default {
   name: 'Cart',
   components: { Checkout },
   computed: {
      ...mapState({
         products: state => state.cart.products
      })
   },
   methods: {
      ...mapMutations({
         removeProductCart: 'REMOVE_PRODUCT_CART',
         incrementQty: 'INCREMENT_QTY_PRODUCT_CART',
         decrementQty: 'DECREMENT_QTY_PRODUCT_CART'
      })
   }
}
</script>

<style scoped>

</style>

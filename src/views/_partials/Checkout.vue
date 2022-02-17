<template>
   <div>
      <div class="cart-price text-red">
         Preço Total: <b>R$ {{ totalCart }}</b>
      </div>
      <a
         @click.prevent="showModal"
         href=""
         class="cart-finalizar mt-3"
      >
         Finalizar
      </a>

      <modal name="checkout" height="270">
         <div class="px-md-5 my-4">
            <div class="row">

               <div
                  v-if="me.authenticated"
                  class="col-md-12"
               >
                  <p><strong>Total de produtos: </strong>{{ products.length }}</p>
                  <p><strong>Preço Total: </strong>{{ totalCart }}</p>
                  <div class="form-group">
                     <textarea name="comment" class="form-control" cols="30" rows="2"></textarea>
                  </div>
                  <button class="btn btn-success btn-full">Fazer Pedido</button>
               </div>

               <div
                  v-else
                  class="col-md-12"
               >
                  <p><strong>Total de produtos: </strong>{{ products.length }}</p>
                  <p><strong>Preço Total: </strong>{{ totalCart }}</p>
                  <div class="form-group">
                     <textarea name="comment" class="form-control" cols="30" rows="3"></textarea>
                  </div>
                  <button class="btn btn-info btn-full">Fazer Pedido Anônimamente</button>
               </div>

            </div>
         </div>
      </modal>
   </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
   name: 'Checkout',
   computed: {
      ...mapState({
         me: state => state.auth,
         products: state => state.cart.products
      }),
      totalCart () {
         let total = 0

         this.products.map((item) => {
            total += item.product.price * item.qty
         })

         return total
      }
   },
   methods: {
      showModal () {
         this.$modal.show('checkout')
      }
   }
}
</script>

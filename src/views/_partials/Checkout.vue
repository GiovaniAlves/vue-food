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
                  <p><strong>Total de produtos: </strong>{{ cartProducts.length }}</p>
                  <p><strong>Preço Total: </strong>{{ formatPrice(totalCart) }}</p>
                  <div class="form-group">
                     <textarea v-model="comment" name="comment" class="form-control" cols="30" rows="2"></textarea>
                  </div>
                  <button
                     @click="createOrder"
                     :disabled="loading"
                     class="btn btn-success btn-full"
                  >
                     <span v-if="loading">Fazendo o pedido... (Aguarde!)</span>
                     <span v-else>Fazer Pedido</span>
                  </button>
               </div>

               <div
                  v-else
                  class="col-md-12"
               >
                  <p><strong>Total de produtos: </strong>{{ cartProducts.length }}</p>
                  <p><strong>Preço Total: </strong>{{ formatPrice(totalCart) }}</p>
                  <div class="form-group">
                     <textarea v-model="comment" name="comment" class="form-control" cols="30" rows="3"></textarea>
                  </div>
                  <button
                     @click="createOrder"
                     :disabled="loading"
                     class="btn btn-info btn-full"
                  >
                     <span v-if="loading">Fazendo o pedido... (Aguarde!)</span>
                     <span v-else>Fazer Pedido Anônimamente</span>
                  </button>
               </div>

            </div>
         </div>
      </modal>
   </div>
</template>

<script>
import { mapState } from 'vuex'
import formatPriceMixin from '@/mixins/format-price'

export default {
   name: 'Checkout',
   data () {
      return {
         comment: '',
         loading: false
      }
   },
   computed: {
      ...mapState({
         me: state => state.auth,
         cartProducts: state => state.cart.products,
         company: state => state.companies.companySelected
      }),
      totalCart () {
         let total = 0

         this.cartProducts.map((item) => {
            total += item.product.price * item.qty
         })

         return total
      }
   },
   mixins: [formatPriceMixin],
   methods: {
      async createOrder () {
         if (this.cartProducts.length === 0) {
            alert('Adicione um produto no carrinho antes de finalizar o pedido!')
            this.hideModal()
            return
         }

         this.loading = true
         const action = this.me.authenticated ? 'createOrderAuthenticated' : 'createOrderAnonymously'

         const params = {
            token_company: this.company.uuid,
            comment: this.comment,
            products: [
               ...this.cartProducts
            ]
         }

         try {
            const order = await this.$store.dispatch(action, params)
            this.$router.push({
               name: 'orderDetail',
               params: { identify: order.identify }
            })
            this.$vToastify.success('Pedido criado comm sucesso.', 'Parabéns')
         } catch (e) {
            console.log(e)
            this.$vToastify.error('Erro ao criar o pedido.', 'Erro')
         } finally {
            this.loading = false
         }
      },
      showModal () {
         this.$modal.show('checkout')
      },
      hideModal () {
         this.$modal.hide('checkout')
      }
   }
}
</script>
